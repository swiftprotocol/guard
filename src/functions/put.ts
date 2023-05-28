import { getAccount } from "../helpers/wallet";
import { RECIPIENT } from "../constants";
import { encrypt } from "../helpers/encrypt";

export default async function put(
  key: string,
  value: string,
  namespace?: string
) {
  const account = this.account || (await getAccount(this.chainId));

  const encryptedValue = await encrypt({
    data: value,
    recipientPubKey: RECIPIENT,
  });

  await this.putAPI({
    address: account.address,
    key,
    namespace,
    value: encryptedValue,
  });
}
