var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAccount } from "./wallet.js";
export function signAuthorizationMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        const account = this.account || (yield getAccount(this.chainId));
        const now = new Date().toISOString();
        const body = `I am authorizing Guard to use my signature to access encrypted data on ${now}`;
        const sign = this.walletMethods
            ? this.walletMethods.signArbitrary
            : window.wallet.signArbitrary;
        const sig = yield sign.call(this, this.chainId, account.address, body);
        const msg = {
            msg: [
                {
                    type: "sign/MsgSignData",
                    value: {
                        signer: account.address,
                        data: btoa(body),
                    },
                },
            ],
            fee: { gas: "0", amount: [] },
            memo: "",
            signatures: [sig],
        };
        return msg;
    });
}
//# sourceMappingURL=sign.js.map