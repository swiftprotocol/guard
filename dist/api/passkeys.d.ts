import type { StdTx } from '@cosmjs/amino';
import type { CredentialKey } from '@swiftprotocol/auth/types';
import { ErrorResponse } from '../types/api.js';
export interface GetResponse {
    hexAddress: string;
    passkey: string;
}
export interface SetResponse {
    hexAddress: string;
    credential: CredentialKey;
}
export default class Passkeys {
    private api;
    constructor(api: string);
    get({ pubkey }: {
        pubkey: string;
    }): Promise<import("axios").AxiosResponse<ErrorResponse | GetResponse, any>>;
    set({ signature, credential, }: {
        signature: StdTx;
        credential: CredentialKey;
    }): Promise<import("axios").AxiosResponse<ErrorResponse | SetResponse, any>>;
}
