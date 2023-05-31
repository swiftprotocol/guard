import { StdTx } from "@keplr-wallet/types";
import { getAccount } from "./wallet.js";

export async function signAuthorizationMessage() {
  const account = this.account || (await getAccount(this.chainId));

  const now = new Date().toISOString();
  const body = `I am authorizing Guard to use my signature to access encrypted data on ${now}`;

  const sign = this.walletMethods
    ? this.walletMethods.signArbitrary
    : window.wallet.signArbitrary;

  const sig = await sign.call(this, this.chainId, account.address, body);

  const msg: StdTx = {
    msg: [
      {
        type: "sign/MsgSignData",
        value: {
          signer: account.address,
          data: btoa(body),
        },
      },
    ],
    fee: { gas: "0", amount: [] },
    memo: "",
    signatures: [sig],
  };

  return msg;
}
