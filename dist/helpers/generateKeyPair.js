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
export default function generateKeyPair() {
    return __awaiter(this, void 0, void 0, function* () {
        const crypto = new Crypto();
        const keyPair = yield crypto.subtle.generateKey({
            name: 'RSA-OAEP',
            modulusLength: 1024,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: 'SHA-256',
        }, true, ['encrypt', 'decrypt']);
        const privateKeyBuffer = yield crypto.subtle.exportKey('pkcs8', keyPair.privateKey);
        const privateKeyHex = Buffer.from(privateKeyBuffer).toString('hex');
        const publicKeyBuffer = yield crypto.subtle.exportKey('spki', keyPair.publicKey);
        const publicKeyHex = Buffer.from(publicKeyBuffer).toString('hex');
        return {
            keyPair,
            privateKeyBuffer,
            privateKeyHex,
            publicKeyBuffer,
            publicKeyHex,
        };
    });
}
//# sourceMappingURL=generateKeyPair.js.map