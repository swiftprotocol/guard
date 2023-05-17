var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function getAccount() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!window.wallet)
            throw new Error("Keplr/Leap not installed");
        const offlineSigner = window.wallet.getOfflineSigner("juno-1");
        const accounts = yield offlineSigner.getAccounts();
        return accounts[0];
    });
}
export function getPublicKey() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!window.wallet)
            throw new Error("Keplr/Leap not installed");
        const offlineSigner = window.wallet.getOfflineSigner("juno-1");
        const accounts = yield offlineSigner.getAccounts();
        const pubKey = Buffer.from(accounts[0].pubkey.buffer).toString("hex");
        return pubKey;
    });
}
//# sourceMappingURL=wallet.js.map