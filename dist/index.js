var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import put from "./functions/put.js";
import get from "./functions/get.js";
import authorize from "./functions/auth/authorize.js";
import revoke from "./functions/auth/revoke.js";
import notifyAuthorize from "./functions/auth/notifyAuthorize.js";
import notifyRevoke from "./functions/auth/notifyRevoke.js";
import { getAccount } from "./helpers/wallet.js";
export default class Guard {
    constructor({ api, wallet, namespace, chainId = "juno-1", account, walletMethods, }) {
        this.api = api;
        this.wallet = wallet;
        this.defaultNamespace = namespace;
        this.chainId = chainId;
        this.account = account;
        this.walletMethods = walletMethods;
        if (!wallet && (!account || !walletMethods))
            throw Error("[GUARD] Either WalletType or account & wallet methods is required.");
        switch (this.wallet) {
            case "keplr":
                if ("keplr" in window)
                    window.wallet = window.keplr;
                break;
            case "leap":
                if ("leap" in window)
                    window.wallet = window.leap;
                break;
        }
        if (process.env.NODE_ENV === "jest") {
            if (this.account)
                console.log("Guard instance initialized with custom account. Address: " +
                    this.account.address);
            else
                getAccount(chainId).then((acc) => console.log("Guard instance initialized with wallet API. Address: " +
                    acc.address));
        }
    }
    put(key, value, namespace) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield put.call(this, key, value, namespace || this.defaultNamespace);
        });
    }
    get(key, namespace) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield get.call(this, key, namespace || this.defaultNamespace);
        });
    }
    authorize(type, address) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield authorize.call(this, type, address);
        });
    }
    revoke(type, address) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield revoke.call(this, type, address);
        });
    }
    notifyAuthorize(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield notifyAuthorize.call(this, name);
        });
    }
    notifyRevoke(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield notifyRevoke.call(this, name);
        });
    }
    putAPI({ address, key, value, namespace, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield axios
                .post(`${this.api}/put/${address}/${key}${namespace ? "/" + namespace : ""}}`, {
                value,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                return res.data;
            })
                .catch((err) => {
                throw Error(err.stack);
            });
            return data;
        });
    }
}
//# sourceMappingURL=index.js.map