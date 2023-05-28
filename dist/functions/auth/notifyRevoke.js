var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import get from "../get.js";
import put from "../put.js";
export default function notifyRevoke(name) {
    return __awaiter(this, void 0, void 0, function* () {
        let authString = "";
        try {
            authString = yield get.call(this, "notify-authorizations");
        }
        catch (e) {
            authString = "";
        }
        const authorizations = authString.split(",") || [];
        yield put.call(this, "notify-authorizations", authorizations.filter((auth) => auth != name).join(","));
    });
}
//# sourceMappingURL=notifyRevoke.js.map