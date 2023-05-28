var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAccount } from "../helpers/wallet.js";
import { RECIPIENT } from "../constants.js";
import { encrypt } from "../helpers/encrypt.js";
export default function put(key, value, namespace) {
    return __awaiter(this, void 0, void 0, function* () {
        const account = this.account || (yield getAccount(this.chainId));
        const encryptedValue = yield encrypt({
            data: value,
            recipientPubKey: RECIPIENT,
        });
        yield this.putAPI({
            address: account.address,
            key,
            namespace,
            value: encryptedValue,
        });
    });
}
//# sourceMappingURL=put.js.map