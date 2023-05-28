import { StdTx } from "@keplr-wallet/types";
import axios from "axios";
import { getAccount } from "../helpers/wallet.js";

export default async function get(key: string, namespace?: string) {
  const account = this.account || (await getAccount(this.chainId));

  const now = new Date().toISOString();
  const body = `I am authorizing Guard to use my signature to access encrypted data on ${now}`;

  const sign = this.walletMethods.signArbitrary || window.wallet.signArbitrary;

  const sig = await sign(this.chainId, account.address, body);

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

  const result = await axios
    .post(
      this.api +
        `/retrieve/${account.address}/${key}${
          namespace ? "/" + namespace : ""
        }`,
      {
        type: "address",
        msg,
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw Error(err.stack);
    });

  return result.value;
}
