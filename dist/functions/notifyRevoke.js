var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default function notifyRevoke(app, signature) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield this.Notify.getAuthorizations({
            pubkey: this.publicKey,
        });
        if (response.status === 200) {
            const { authorizations: currentAuthorizations } = response.data;
            const authorizations = currentAuthorizations.filter((authorization) => !authorization.includes(app));
            const newResponse = yield this.Notify.setAuthorizations({
                signature,
                pubkey: this.publicKey,
                authorizations,
            });
            if (newResponse.status === 200) {
                return;
            }
            else {
                const errorResponse = newResponse.data;
                throw new Error(`/notify/setAuthorizations returned ${newResponse.status} status with error: ${errorResponse.error}`);
            }
        }
        else {
            const errorResponse = response.data;
            throw new Error(`/data/get returned ${response.status} status with error: ${errorResponse.error}`);
        }
    });
}
//# sourceMappingURL=notifyRevoke.js.map