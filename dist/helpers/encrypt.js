var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import crypto from "crypto";
import { ec as EC } from "elliptic";
import { getPublicKey } from "./wallet";
export function encrypt({ data, recipientPubKey, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const senderPubKey = yield getPublicKey();
        const senderKeyPair = new EC("secp256k1").keyFromPublic(senderPubKey);
        const recipientKeyPair = new EC("secp256k1").keyFromPublic(recipientPubKey);
        // This key is completely arbitrary, not actually the Keplr private key
        const senderPrivateKey = senderKeyPair.getPrivate("hex");
        // Derive shared secret from recipient's public key and sender's private key
        const sharedSecret = recipientKeyPair.derive(senderKeyPair.getPublic());
        // Generate a random symmetric encryption key
        const symmetricKey = crypto.randomBytes(32); // 256-bit key for AES-256
        // Encrypt the data using the symmetric key
        const cipher = crypto.createCipheriv("aes-256-cbc", symmetricKey, crypto.randomBytes(16));
        let encryptedData = cipher.update(data, "utf8", "hex");
        encryptedData += cipher.final("hex");
        // Encrypt the symmetric key using the derived shared secret
        const sharedSecretHash = crypto
            .createHash("sha256")
            .update(sharedSecret.toString())
            .digest();
        const encryptedKey = crypto.privateEncrypt(senderPrivateKey, sharedSecretHash);
        return { symmkey: encryptedKey.toString("base64"), value: encryptedData };
    });
}
//# sourceMappingURL=encrypt.js.map