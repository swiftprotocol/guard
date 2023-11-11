var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
export default class Data {
    constructor(api) {
        this.api = api;
    }
    get({ address, key, pubkey, namespace, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield axios.post(this.api + '/data/get', {
                address,
                key,
                pubkey,
                namespace,
            });
        });
    }
    set({ signature, key, symmetricKeys, cipherText, namespace, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield axios.post(this.api + '/data/set', {
                signature,
                key,
                symmetricKeys,
                cipherText,
                namespace,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        });
    }
}
//# sourceMappingURL=data.js.map