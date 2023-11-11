var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import encrypt from '../helpers/encrypt.js';
export default function set(key, value, recipients, signature, namespace) {
    return __awaiter(this, void 0, void 0, function* () {
        const { symmetricKeys, cipherText } = yield encrypt({
            data: value,
            recipients,
        });
        const response = yield this.Data.set({
            key,
            cipherText,
            symmetricKeys,
            signature,
            namespace,
        });
        if (response.status === 200) {
            return;
        }
        else {
            const errorResponse = response.data;
            throw new Error(`/data/get returned ${response.status} status with error: ${errorResponse.error}`);
        }
    });
}
//# sourceMappingURL=set.js.map