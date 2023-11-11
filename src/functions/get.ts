import type { GetResponse } from '../api/data.js'
import decrypt from '../helpers/decrypt.js'
import Guard from '../index.js'
import type { ErrorResponse } from '../types/api.js'

export default async function get(
  this: Guard,
  address: string,
  key: string,
  privateKeyHex: string,
  namespace?: string
): Promise<string> {
  const response = await this.Data.get({
    address,
    key,
    pubkey: this.publicKey,
    namespace,
  })

  if (response.status === 200) {
    const { symmetricKey, cipherText } = response.data as GetResponse

    const decryptedValue = await decrypt({
      symmetricKey,
      cipherText,
      recipientPrivateKey: privateKeyHex,
    })

    return decryptedValue
  } else {
    const errorResponse = response.data as ErrorResponse
    throw new Error(
      `/data/get returned ${response.status} status with error: ${errorResponse.error}`
    )
  }
}
