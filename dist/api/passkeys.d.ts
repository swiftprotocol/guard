import type { StdTx } from '@cosmjs/amino';
import type { CredentialKey } from '@swiftprotocol/auth/types';
import { ErrorResponse } from '../types/api.js';
export interface GetResponse {
    hexAddress: string;
    pubkey: string;
    passkey: string;
}
export interface SetResponse {
    hexAddress: string;
    credential: CredentialKey;
}
export default class Passkeys {
    private api;
    constructor(api: string);
    get({ address }: {
        address: string;
    }): Promise<import("axios").AxiosResponse<ErrorResponse | GetResponse, any>>;
    set({ walletSignature, signature, publicKey, credential, }: {
        walletSignature: StdTx;
        signature: string;
        publicKey: string;
        credential: CredentialKey;
    }): Promise<import("axios").AxiosResponse<ErrorResponse | SetResponse, any>>;
}
