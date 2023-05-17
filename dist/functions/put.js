var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RECIPIENT } from "src/constants";
import { encrypt } from "src/helpers/encrypt";
export default function put(key, value) {
    return __awaiter(this, void 0, void 0, function* () {
        const { value: encryptedValue, symmkey } = yield encrypt({
            data: value,
            recipientPubKey: RECIPIENT,
        });
        yield this.query(`INSERT INTO key_value (key, value, symmkey) VALUES ('${key}', '${encryptedValue}', '${symmkey}') ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, symmkey = EXCLUDED.symmkey;`);
    });
}
//# sourceMappingURL=put.js.map