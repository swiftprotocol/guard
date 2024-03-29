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
export default class Passkeys {
    constructor(api) {
        this.api = api;
    }
    get({ address }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield axios.post(this.api + '/passkeys/get', {
                address,
            });
        });
    }
    set({ walletSignature, signature, publicKey, credential, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield axios.post(this.api + '/passkeys/set', {
                walletSignature,
                signature,
                publicKey,
                credential,
            });
        });
    }
}
//# sourceMappingURL=passkeys.js.map