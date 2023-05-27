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

  await this.query(
    `INSERT INTO key_value (key, value) VALUES ('${
      namespace ? namespace + "/" : ""
    }${key}+${
      account.address
    }', '${encryptedValue}') ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;`
  );
}
