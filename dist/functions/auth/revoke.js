var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import get from "../get";
import put from "../put";
export default function revoke(type, address) {
    return __awaiter(this, void 0, void 0, function* () {
        let authString = "";
        try {
            authString = yield get.call(this, "authorizations");
        }
        catch (e) {
            authString = "";
        }
        const authorizations = authString.split(",") || [];
        yield put.call(this, "authorizations", authorizations.filter((auth) => auth != `${type}+${address}`).join(","));
    });
}
//# sourceMappingURL=revoke.js.map