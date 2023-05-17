import type { Keplr } from "@keplr-wallet/types";
declare global {
    interface Window {
        wallet: Keplr;
        keplr?: any;
        leap?: any;
        litNodeClient: any;
    }
}
export interface GuardConstructorTypes {
    api: string;
    wallet: WalletType;
}
export interface Row {
    key: string;
    value: string;
    symmkey: string;
}
export declare type WalletType = "keplr" | "leap";
export default class Guard {
    api: string;
    wallet: WalletType;
    private client;
    constructor({ api, wallet }: GuardConstructorTypes);
    query(q: string, values?: any): Promise<any>;
}
