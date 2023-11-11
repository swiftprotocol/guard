var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Data, Passkeys, Webauthn } from './api/index.js';
import { API_URL } from './constants.js';
import { authorize, get, revoke, set } from './functions/index.js';
export default class Guard {
    constructor(publicKeyHex, privateKeyHex, { api, namespace }) {
        this.api = api || API_URL;
        this.namespace = namespace;
        this.publicKey = publicKeyHex;
        this.privateKey = privateKeyHex;
        // Init API classes
        this.Data = new Data(this.api);
        this.Passkeys = new Passkeys(this.api);
        this.Webauthn = new Webauthn(this.api);
    }
    get(address, key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield get.call(this, address, key, this.privateKey, this.namespace);
        });
    }
    set(key, value, recipients, signature) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield set.call(this, key, value, recipients, signature, this.namespace);
        });
    }
    authorize(address, key, recipient, signature) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield authorize.call(this, address, key, recipient, this.privateKey, signature, this.namespace);
        });
    }
    revoke(address, key, recipient, signature) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield revoke.call(this, address, key, recipient, this.privateKey, signature, this.namespace);
        });
    }
}
//# sourceMappingURL=index.js.map