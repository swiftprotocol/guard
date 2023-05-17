import type { ConnectionConfig } from "pg";
import type { Keplr } from "@keplr-wallet/types";

import { Client } from "pg";
import axios from "axios";

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

export type WalletType = "keplr" | "leap";

export default class Guard {
  public api: string;
  public wallet: WalletType;

  private client: Client;

  constructor({ api, wallet }: GuardConstructorTypes) {
    this.api = api;
    this.wallet = wallet;

    switch (this.wallet) {
      case "keplr":
        if ("keplr" in window) window.wallet = window.keplr;
        break;
      case "leap":
        if ("leap" in window) window.wallet = window.leap;
        break;
    }
  }

  public async query(q: string, values?: any) {
    const data = await axios
      .post(
        this.api,
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
