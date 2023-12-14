import { fromBech32 } from '@cosmjs/encoding'
import { GetResponse } from '../api/data.js'
import decrypt from '../helpers/decrypt.js'
import encrypt from '../helpers/encrypt.js'
import Guard, { signMessage } from '../index.js'
import type { ErrorResponse } from '../types/api.js'

export default async function revoke(
  this: Guard,
  address: string,
  key: string,
  recipient: string,
  privateKeyHex: string,
  namespace?: string
): Promise<void> {
  const response = await this.Data.get({
    address,
    key,
    pubkey: this.publicKey,
    namespace,
  })

  if (response.status === 200) {
    const {
      symmetricKey,
      cipherText,
      symmetricKeys: prevSymmetricKeys,
    } = response.data as GetResponse

    const decryptedValue = await decrypt({
      symmetricKey,
      cipherText,
      recipientPrivateKey: privateKeyHex,
    })

    const recipients = prevSymmetricKeys
      .filter((key) => key.recipient !== recipient)
      .map((key) => key.recipient)

    const { symmetricKeys, cipherText: newCipherText } = await encrypt({
      data: decryptedValue,
      recipients,
    })

    const rawAddress = fromBech32(address).data
    const hexAddress = Buffer.from(rawAddress).toString('hex')

    const signature = await signMessage(privateKeyHex, hexAddress)

    const newResponse = await this.Data.set({
      signature,
      pubkey: this.publicKey,
      key,
      symmetricKeys,
      cipherText: newCipherText,
      namespace,
    })

    if (newResponse.status === 200) {
      return
    } else {
      const errorResponse = newResponse.data as ErrorResponse
      throw new Error(
        `/data/set returned ${newResponse.status} status with error: ${errorResponse.error}`
      )
    }
  } else {
    const errorResponse = response.data as ErrorResponse
    throw new Error(
      `/data/get returned ${response.status} status with error: ${errorResponse.error}`
    )
  }
}
