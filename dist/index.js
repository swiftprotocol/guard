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
export default class Guard {
    constructor({ api, wallet }) {
        this.api = api;
        this.wallet = wallet;
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
    query(q, values) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield axios
                .post(this.api, {
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