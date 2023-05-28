import type { Keplr } from "@keplr-wallet/types";
import axios from "axios";

import put from "./functions/put.js";
import get from "./functions/get.js";
import authorize from "./functions/auth/authorize.js";
import revoke from "./functions/auth/revoke.js";
import notifyAuthorize from "./functions/auth/notifyAuthorize.js";
import notifyRevoke from "./functions/auth/notifyRevoke.js";
import { getAccount } from "./helpers/wallet.js";

declare global {
  interface Window {
    wallet: Keplr;
    keplr?: any;
    leap?: any;
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

export type WalletType = "keplr" | "leap";

export default class Guard {
  public api: string;
  public wallet?: WalletType;

  public defaultNamespace?: string;
  public chainId: string;

  public account?: GuardConstructorTypes["account"];
  public walletMethods?: GuardConstructorTypes["walletMethods"];

  constructor({
    api,
    wallet,
    namespace,
    chainId = "juno-1",
    account,
    walletMethods,
  }: GuardConstructorTypes) {
    this.api = api;
    this.wallet = wallet;

    this.defaultNamespace = namespace;
    this.chainId = chainId;

    this.account = account;
    this.walletMethods = walletMethods;

    if (!wallet && (!account || !walletMethods))
      throw Error(
        "[GUARD] Either WalletType or account & wallet methods is required."
      );

    switch (this.wallet) {
      case "keplr":
        if ("keplr" in window) window.wallet = window.keplr;
        break;
      case "leap":
        if ("leap" in window) window.wallet = window.leap;
        break;
    }

    // if (process.env.NODE_ENV === "jest") {
    //   if (this.account)
    //     console.log(
    //       "Guard instance initialized with custom account. Address: " +
    //         this.account.address
    //     );
    //   else
    //     getAccount(chainId).then((acc) =>
    //       console.log(
    //         "Guard instance initialized with wallet API. Address: " +
    //           acc.address
    //       )
    //     );
    // }
  }

  public async put(key: string, value: string, namespace?: string) {
    return await put.call(this, key, value, namespace || this.defaultNamespace);
  }

  public async get(key: string, namespace?: string) {
    return await get.call(this, key, namespace || this.defaultNamespace);
  }

  public async authorize(type: string, address: string) {
    return await authorize.call(this, type, address);
  }

  public async revoke(type: string, address: string) {
    return await revoke.call(this, type, address);
  }

  public async notifyAuthorize(name: string) {
    return await notifyAuthorize.call(this, name);
  }

  public async notifyRevoke(name: string) {
    return await notifyRevoke.call(this, name);
  }

  public async putAPI({
    address,
    key,
    value,
    namespace,
  }: {
    address: string;
    key: string;
    value: string;
    namespace?: string;
  }) {
    const data = await axios
      .post(
        `${this.api}/put/${address}/${key}`,
        {
          value,
          namespace,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw Error(err.stack);
      });

    return data;
  }
}
