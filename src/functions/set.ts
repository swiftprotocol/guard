import encrypt from '../helpers/encrypt.js'
import Guard from '../index.js'
import type { ErrorResponse } from '../types/api.js'

export default async function set(
  this: Guard,
  key: string,
  value: string,
  recipients: string[],
  signature: string,
  publicKeyHex: string,
  namespace?: string
): Promise<void> {
  const { symmetricKeys, cipherText } = await encrypt({
    data: value,
    recipients,
  })

  const response = await this.Data.set({
    signature,
    pubkey: publicKeyHex,
    key,
    symmetricKeys,
    cipherText,
    namespace,
  })

  if (response.status === 200) {
    return
  } else {
    const errorResponse = response.data as ErrorResponse
    throw new Error(
      `/data/get returned ${response.status} status with error: ${errorResponse.error}`
    )
  }
}
