import type { Keplr } from "@keplr-wallet/types";
declare global {
    interface Window {
        wallet: Keplr;
        keplr?: any;
        leap?: any;
    }
}
export interface GuardConstructorTypes {
    api: string;
    wallet: WalletType;
    namespace?: string;
}
export interface Row {
    key: string;
    value: string;
}
export declare type WalletType = "keplr" | "leap";
export default class Guard {
    api: string;
    wallet: WalletType;
    defaultNamespace?: string;
    constructor({ api, wallet, namespace }: GuardConstructorTypes);
    put(key: string, value: string, namespace?: string): Promise<any>;
    get(key: string, namespace?: string): Promise<any>;
    query(q: string, values?: any): Promise<any>;
}
