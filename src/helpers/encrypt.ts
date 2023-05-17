import crypto from "crypto";
import { ec as EC } from "elliptic";
import { getPublicKey } from "./wallet";

interface EncryptParams {
  data: string; // Data to encrypt
  recipientPubKey: string; // Hex-encoded recipient public key
}

interface EncryptedData {
  value: string;
  symmkey: string;
}

export async function encrypt({
  data,
  recipientPubKey,
}: EncryptParams): Promise<EncryptedData> {
  const senderPubKey = await getPublicKey();

  const senderKeyPair = new EC("secp256k1").keyFromPublic(senderPubKey);
  const recipientKeyPair = new EC("secp256k1").keyFromPublic(recipientPubKey);

  // This key is completely arbitrary, not actually the Keplr private key
  const senderPrivateKey = senderKeyPair.getPrivate("hex");

  // Derive shared secret from recipient's public key and sender's private key
  const sharedSecret = recipientKeyPair.derive(senderKeyPair.getPublic());

  // Generate a random symmetric encryption key
  const symmetricKey = crypto.randomBytes(32); // 256-bit key for AES-256

  // Encrypt the data using the symmetric key
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    symmetricKey,
    crypto.randomBytes(16)
  );
  let encryptedData = cipher.update(data, "utf8", "hex");
  encryptedData += cipher.final("hex");

  // Encrypt the symmetric key using the derived shared secret
  const sharedSecretHash = crypto
    .createHash("sha256")
    .update(sharedSecret.toString())
    .digest();
  const encryptedKey = crypto.privateEncrypt(
    senderPrivateKey,
    sharedSecretHash
  );

  return { symmkey: encryptedKey.toString("base64"), value: encryptedData };
}
