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
import { TextDecoder } from 'util';
const textDecoder = new TextDecoder();
const crypto = new Crypto();
export default function decrypt({ symmetricKey, cipherText, recipientPrivateKey, }) {
    return __awaiter(this, void 0, void 0, function* () {
        // Import the recipient's private key
        const recipientPrivateKeyBuffer = Buffer.from(recipientPrivateKey, 'hex');
        const importedPrivateKey = yield crypto.subtle.importKey('pkcs8', recipientPrivateKeyBuffer, {
            name: 'RSA-OAEP',
            hash: 'SHA-256',
        }, true, ['decrypt']);
        // Decrypt the AES key with the recipient's private key
        const encryptedAesKeyBuffer = Buffer.from(symmetricKey.key, 'hex');
        const decryptedAesKeyBuffer = yield crypto.subtle.decrypt({ name: 'RSA-OAEP' }, importedPrivateKey, encryptedAesKeyBuffer);
        // Import the decrypted AES key
        const decryptedAesKey = yield crypto.subtle.importKey('raw', decryptedAesKeyBuffer, { name: 'AES-GCM', length: 256 }, true, ['decrypt']);
        // Decrypt the private key with the decrypted AES key
        const encryptedPrivateKeyBuffer = Buffer.from(symmetricKey.encryptedPrivateKey, 'hex');
        const decryptedPrivateKeyBuffer = yield crypto.subtle.decrypt({ name: 'AES-GCM', iv: Buffer.from(symmetricKey.iv, 'hex') }, decryptedAesKey, encryptedPrivateKeyBuffer);
        // Decrypt the cipherText with the decrypted private key
        const cipherTextBuffer = Buffer.from(cipherText, 'hex');
        const importedDecryptedPrivateKey = yield crypto.subtle.importKey('pkcs8', decryptedPrivateKeyBuffer, {
            name: 'RSA-OAEP',
            hash: 'SHA-256',
        }, true, ['decrypt']);
        const decryptedData = yield crypto.subtle.decrypt({ name: 'RSA-OAEP' }, importedDecryptedPrivateKey, cipherTextBuffer);
        return textDecoder.decode(decryptedData);
    });
}
//# sourceMappingURL=decrypt.js.map