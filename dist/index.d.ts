import { Data, Passkeys, Webauthn } from './api/index.js';
export * from './helpers/index.js';
export default class Guard {
    api: string;
    namespace: string | undefined;
    private privateKey;
    publicKey: string;
    Data: Data;
    Passkeys: Passkeys;
    Webauthn: Webauthn;
    constructor(publicKeyHex: string, privateKeyHex: string, { api, namespace }: {
        api?: string;
        namespace?: string;
    });
    get(address: string, key: string): Promise<string>;
    set(address: string, key: string, value: string, recipients: string[]): Promise<any>;
    authorize(address: string, key: string, recipient: string): Promise<any>;
    revoke(address: string, key: string, recipient: string): Promise<any>;
}
