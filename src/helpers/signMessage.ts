import { Crypto } from '@peculiar/webcrypto'

export default async function signMessage(
  privateKeyHex: string,
  message: string
) {
  const crypto = typeof window !== 'undefined' ? window.crypto : new Crypto()

  const privateKeyBuffer = Buffer.from(privateKeyHex, 'hex')

  const privateKey = await crypto.subtle.importKey(
    'pkcs8',
    privateKeyBuffer,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false,
    ['sign']
  )

  const encoder = new TextEncoder()
  const messageBuffer = encoder.encode(message)

  const signatureBuffer = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    privateKey,
    messageBuffer
  )

  const signatureHex = Buffer.from(signatureBuffer).toString('hex')

  return signatureHex
}
