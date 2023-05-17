import EthCrypto from "eth-crypto";

interface EncryptParams {
  data: string; // Data to encrypt
  recipientPubKey: string; // Hex-encoded recipient public key
}

export async function encrypt({
  data,
  recipientPubKey,
}: EncryptParams): Promise<string> {
  const encrypted = await EthCrypto.encryptWithPublicKey(recipientPubKey, data);
  return EthCrypto.cipher.stringify(encrypted);
}
