import { RECIPIENT } from "src/constants";
import { encrypt } from "src/helpers/encrypt";

export default async function put(key: string, value: string) {
  const { value: encryptedValue, symmkey } = await encrypt({
    data: value,
    recipientPubKey: RECIPIENT,
  });

  await this.query(
    `INSERT INTO key_value (key, value, symmkey) VALUES ('${key}', '${encryptedValue}', '${symmkey}') ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, symmkey = EXCLUDED.symmkey;`
  );
}
