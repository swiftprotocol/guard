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
    getAuthorizations({ pubkey }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield axios.post(this.api + '/notify/auth/get', {
                pubkey,
            });
        });
    }
    setAuthorizations({ pubkey, authorizations, signature, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield axios.post(this.api + '/notify/auth/set', {
                pubkey,
                authorizations,
                signature,
            });
        });
    }
    subscribe({ app, pubkey, signature, subscription, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield axios.post(this.api + '/notify/subscribe', {
                app,
                pubkey,
                signature,
                subscription,
            });
        });
    }
}
//# sourceMappingURL=notify.js.map