import axios from "axios";
import { getAccount } from "../helpers/wallet.js";
import { signAuthorizationMessage } from "../helpers/sign.js";

export default async function get(key: string, namespace?: string) {
  const account = this.account || (await getAccount(this.chainId));

  const msg = this.sig || (await signAuthorizationMessage.call(this));

  const result = await axios
    .post(this.api + `/retrieve/${account.address}/${key}`, {
      type: "address",
      namespace,
      msg,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw Error(err.stack);
    });

  return result.value;
}
