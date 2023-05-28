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
export default function authorize(type, address) {
    return __awaiter(this, void 0, void 0, function* () {
        let authString = "";
        try {
            authString = yield get.call(this, "authorizations");
        }
        catch (e) {
            authString = "";
        }
        const authorizations = authString.split(",") || [];
        if (!authorizations.includes(`${type}+${address}`))
            authorizations.push(`${type}+${address}`);
        yield put.call(this, "authorizations", authorizations.join(","));
    });
}
//# sourceMappingURL=authorize.js.map