var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fromBech32 } from '@cosmjs/encoding';
import { Data, Notify, Passkeys, Webauthn } from './api/index.js';
import { API_URL } from './constants.js';
import { authorize, get, notifyAuthorize, revoke, set, } from './functions/index.js';
import signMessage from './helpers/signMessage.js';
export * from './helpers/index.js';
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
        this.Notify = new Notify(this.api);
    }
    get(address, key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield get.call(this, address, key, this.privateKey, this.namespace);
        });
    }
    set(address, key, value, recipients) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawAddress = fromBech32(address).data;
            const hexAddress = Buffer.from(rawAddress).toString('hex');
            const signature = yield signMessage(this.privateKey, hexAddress);
            return yield set.call(this, key, value, recipients, signature, this.publicKey, this.namespace);
        });
    }
    authorize(address, key, recipient) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield authorize.call(this, address, key, recipient, this.privateKey, this.namespace);
        });
    }
    revoke(address, key, recipient) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield revoke.call(this, address, key, recipient, this.privateKey, this.namespace);
        });
    }
    notifyAuthorize(address, app, notificationTypes) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawAddress = fromBech32(address).data;
            const hexAddress = Buffer.from(rawAddress).toString('hex');
            const signature = yield signMessage(this.privateKey, hexAddress);
            return yield notifyAuthorize.call(this, app, notificationTypes, signature);
        });
    }
    notifyRevoke(address, app) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawAddress = fromBech32(address).data;
            const hexAddress = Buffer.from(rawAddress).toString('hex');
            const signature = yield signMessage(this.privateKey, hexAddress);
            return yield notifyAuthorize.call(this, app, signature);
        });
    }
}
//# sourceMappingURL=index.js.map