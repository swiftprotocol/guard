import { getAccount } from "src/helpers/wallet.js";
import { RECIPIENT } from "../constants.js";
import { encrypt } from "../helpers/encrypt.js";

export default async function put(
  key: string,
  value: string,
  namespace?: string
) {
  const account = await getAccount();

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
