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
export default function signMessage(privateKeyHex, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const crypto = new Crypto();
        const privateKeyBuffer = Buffer.from(privateKeyHex, 'hex');
        const privateKey = yield crypto.subtle.importKey('pkcs8', privateKeyBuffer, {
            name: 'RSASSA-PKCS1-v1_5',
            hash: 'SHA-256',
        }, false, ['sign']);
        const encoder = new TextEncoder();
        const messageBuffer = encoder.encode(message);
        const signatureBuffer = yield crypto.subtle.sign('RSASSA-PKCS1-v1_5', privateKey, messageBuffer);
        const signatureHex = Buffer.from(signatureBuffer).toString('hex');
        return signatureHex;
    });
}
//# sourceMappingURL=signMessage.js.map