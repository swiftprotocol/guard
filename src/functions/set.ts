import type { StdTx } from '@cosmjs/amino'
import encrypt from '../helpers/encrypt.js'
import Guard from '../index.js'
import type { ErrorResponse } from '../types/api.js'

export default async function set(
  this: Guard,
  key: string,
  value: string,
  recipients: string[],
  signature: StdTx,
  namespace?: string
): Promise<void> {
  const { symmetricKeys, cipherText } = await encrypt({
    data: value,
    recipients,
  })

  const response = await this.Data.set({
    key,
    cipherText,
    symmetricKeys,
    signature,
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
