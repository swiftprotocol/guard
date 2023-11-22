var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Crypto } from '@peculiar/webcrypto';
import { TextEncoder } from 'text-encoding';
export default function encrypt({ data, recipients, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const textEncoder = new TextEncoder();
        const crypto = new Crypto();
        // Generate an RSA-OAEP key pair
        const keyPair = yield crypto.subtle.generateKey({
            name: 'RSA-OAEP',
            modulusLength: 1024,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: 'SHA-256',
        }, true, ['encrypt', 'decrypt']);
        // Encrypt the plaintext data using the public key
        const plainTextEncoded = textEncoder.encode(data.toString());
        const encryptedData = yield crypto.subtle.encrypt({ name: 'RSA-OAEP' }, keyPair.publicKey, plainTextEncoded);
        // Export the private key to PKCS8 format
        const privateKeyBuffer = yield crypto.subtle.exportKey('pkcs8', keyPair.privateKey);
        const encryptedKeysPromise = recipients.map((recipient) => __awaiter(this, void 0, void 0, function* () {
            const recipientPublicKeyBuffer = Buffer.from(recipient, 'hex');
            const recipientPublicKey = yield crypto.subtle.importKey('spki', recipientPublicKeyBuffer, {
                name: 'RSA-OAEP',
                hash: 'SHA-256',
            }, true, ['encrypt']);
            // Generate a random AES key
            const aesKey = yield crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
            // Generate a random iv
            const iv = crypto.getRandomValues(new Uint8Array(12));
            // Encrypt the private key with the AES key
            const encryptedPrivateKey = yield crypto.subtle.encrypt({ name: 'AES-GCM', iv }, aesKey, privateKeyBuffer);
            // Export the AES key to raw format
            const aesKeyBuffer = yield crypto.subtle.exportKey('raw', aesKey);
            // Encrypt the AES key with the RSA public key
            const encryptedAesKey = yield crypto.subtle.encrypt({ name: 'RSA-OAEP' }, recipientPublicKey, aesKeyBuffer);
            return {
                recipient,
                key: Buffer.from(encryptedAesKey).toString('hex'),
                encryptedPrivateKey: Buffer.from(encryptedPrivateKey).toString('hex'),
                iv: Buffer.from(iv).toString('hex'),
            };
        }));
        const encryptedKeys = yield Promise.all(encryptedKeysPromise);
        return {
            symmetricKeys: encryptedKeys,
            cipherText: Buffer.from(encryptedData).toString('hex'),
        };
    });
}
//# sourceMappingURL=encrypt.js.map