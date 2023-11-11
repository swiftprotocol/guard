import type { StdTx } from '@cosmjs/amino';
import { Data, Passkeys, Webauthn } from './api/index.js';
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
    set(key: string, value: string, recipients: string[], signature: StdTx): Promise<any>;
    authorize(address: string, key: string, recipient: string, signature: StdTx): Promise<any>;
    revoke(address: string, key: string, recipient: string, signature: StdTx): Promise<any>;
}
