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
export default function get(address, key, privateKeyHex, namespace) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield this.Data.get({
            address,
            key,
            pubkey: this.publicKey,
            namespace,
        });
        if (response.status === 200) {
            const { symmetricKey, cipherText } = response.data;
            const decryptedValue = yield decrypt({
                symmetricKey,
                cipherText,
                recipientPrivateKey: privateKeyHex,
            });
            return decryptedValue;
        }
        else {
            const errorResponse = response.data;
            throw new Error(`/data/get returned ${response.status} status with error: ${errorResponse.error}`);
        }
    });
}
//# sourceMappingURL=get.js.map