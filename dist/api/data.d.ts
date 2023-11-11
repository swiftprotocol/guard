import type { StdTx } from '@cosmjs/amino';
import { ErrorResponse } from '../types/api.js';
import type { SymmKey } from '../types/database.js';
export interface GetResponse {
    symmetricKey: SymmKey;
    cipherText: string;
    symmetricKeys: SymmKey[];
}
export interface SetResponse {
    hexAddress: string;
    key: string;
}
export default class Data {
    private api;
    constructor(api: string);
    get({ address, key, pubkey, namespace, }: {
        address: string;
        key: string;
        pubkey: string;
        namespace?: string;
    }): Promise<import("axios").AxiosResponse<ErrorResponse | GetResponse, any>>;
    set({ signature, key, symmetricKeys, cipherText, namespace, }: {
        signature: StdTx;
        key: string;
        symmetricKeys: SymmKey[];
        cipherText: string;
        namespace?: string;
    }): Promise<import("axios").AxiosResponse<ErrorResponse | SetResponse, any>>;
}
