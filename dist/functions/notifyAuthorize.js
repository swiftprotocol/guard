var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default function notifyAuthorize(app, notificationTypes, signature) {
    return __awaiter(this, void 0, void 0, function* () {
        const authorizationString = `${app}:${notificationTypes.join('-')}`;
        const response = yield this.Notify.getAuthorizations({
            pubkey: this.publicKey,
        });
        if (response.status === 200) {
            const { authorizations: currentAuthorizations } = response.data;
            // If the authorization already exists, replace it with authorizationString
            const authorizations = currentAuthorizations.filter((authorization) => !authorization.includes(app));
            const newAuthorizations = [...authorizations, authorizationString];
            const newResponse = yield this.Notify.setAuthorizations({
                signature,
                pubkey: this.publicKey,
                authorizations: newAuthorizations,
            });
            if (newResponse.status === 200) {
                return;
            }
            else {
                const errorResponse = newResponse.data;
                throw new Error(`/notify/auth returned ${newResponse.status} status with error: ${errorResponse.error}`);
            }
        }
        else {
            const errorResponse = response.data;
            throw new Error(`/notify/auth returned ${response.status} status with error: ${errorResponse.error}`);
        }
    });
}
//# sourceMappingURL=notifyAuthorize.js.map