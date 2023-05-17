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
export default class Guard {
    constructor({ api, wallet, namespace }) {
        this.api = api;
        this.wallet = wallet;
        this.defaultNamespace = namespace;
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
    query(q, values) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield axios
                .post(this.api + "/sql", {
                query: q,
                values,
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