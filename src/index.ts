import type { Keplr } from "@keplr-wallet/types";
import axios from "axios";

import put from "./functions/put.js";
import get from "./functions/get.js";

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

export type WalletType = "keplr" | "leap";

export default class Guard {
  public api: string;
  public wallet: WalletType;
  public defaultNamespace?: string;

  constructor({ api, wallet, namespace }: GuardConstructorTypes) {
    this.api = api;
    this.wallet = wallet;
    this.defaultNamespace = namespace;

    switch (this.wallet) {
      case "keplr":
        if ("keplr" in window) window.wallet = window.keplr;
        break;
      case "leap":
        if ("leap" in window) window.wallet = window.leap;
        break;
    }
  }

  public async put(key: string, value: string, namespace?: string) {
    return await put.call(this, key, value, namespace || this.defaultNamespace);
  }

  public async get(key: string, namespace?: string) {
    return await get.call(this, key, namespace || this.defaultNamespace);
  }

  public async query(q: string, values?: any) {
    const data = await axios
      .post(
        this.api + "/sql",
        {
          query: q,
          values,
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
