import type { Keplr, StdTx } from "@keplr-wallet/types";
declare global {
    interface Window {
        wallet: Keplr;
        keplr?: any;
        leap?: any;
        cosmostation?: any;
    }
}
export interface GuardConstructorTypes {
    api: string;
    wallet?: WalletType;
    namespace?: string;
    chainId?: string;
    account?: {
        address: string;
        hexPubKey: string;
    };
    walletMethods?: {
        signArbitrary: Keplr["signArbitrary"];
    };
}
export interface Row {
    key: string;
    value: string;
}
export type WalletType = "keplr" | "leap" | "cosmostation";
export default class Guard {
    api: string;
    wallet?: WalletType;
    defaultNamespace?: string;
    chainId: string;
    sig?: StdTx;
    account?: GuardConstructorTypes["account"];
    walletMethods?: GuardConstructorTypes["walletMethods"];
    constructor({ api, wallet, namespace, chainId, account, walletMethods, }: GuardConstructorTypes);
    put(key: string, value: string, namespace?: string): Promise<any>;
    get(key: string, namespace?: string): Promise<any>;
    authorize(type: string, address: string): Promise<any>;
    revoke(type: string, address: string): Promise<any>;
    notifyAuthorize(name: string): Promise<any>;
    notifyRevoke(name: string): Promise<any>;
    putAPI({ address, key, value, namespace, }: {
        address: string;
        key: string;
        value: string;
        namespace?: string;
    }): Promise<any>;
}
