var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import decrypt from '../helpers/decrypt.js';
import encrypt from '../helpers/encrypt.js';
export default function authorize(address, key, recipient, privateKeyHex, signature, namespace) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield this.Data.get({
            address,
            key,
            pubkey: this.publicKey,
            namespace,
        });
        if (response.status === 200) {
            const { symmetricKey, cipherText, symmetricKeys: prevSymmetricKeys, } = response.data;
            const decryptedValue = yield decrypt({
                symmetricKey,
                cipherText,
                recipientPrivateKey: privateKeyHex,
            });
            const recipients = prevSymmetricKeys.map((key) => key.recipient);
            const { symmetricKeys, cipherText: newCipherText } = yield encrypt({
                data: decryptedValue,
                recipients: [...recipients, recipient],
            });
            const newResponse = yield this.Data.set({
                key,
                cipherText: newCipherText,
                symmetricKeys,
                signature,
                namespace,
            });
            if (newResponse.status === 200) {
                return;
            }
            else {
                const errorResponse = newResponse.data;
                throw new Error(`/data/get returned ${newResponse.status} status with error: ${errorResponse.error}`);
            }
        }
        else {
            const errorResponse = response.data;
            throw new Error(`/data/get returned ${response.status} status with error: ${errorResponse.error}`);
        }
    });
}
//# sourceMappingURL=authorize.js.map