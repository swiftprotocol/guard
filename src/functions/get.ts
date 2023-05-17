import { StdTx } from "@keplr-wallet/types";
import axios from "axios";
import { getAccount } from "src/helpers/wallet";

export default async function get(key: string, namespace?: string) {
  const account = await getAccount();

  const now = new Date().toISOString();
  const body = `I am authorizing Guard to use my signature to access encrypted data on ${now}`;

  const sig = await window.wallet.signArbitrary(
    "juno-1",
    account.address,
    body
  );

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
        `/retrieve/${account.address}/${
          namespace ? namespace + "/" : ""
        }${key}+${account.address}`,
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

  console.log(result);

  return result.value;
}
