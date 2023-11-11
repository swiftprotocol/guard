import { Crypto } from '@peculiar/webcrypto'

const crypto = new Crypto()

export default async function generateKeyPair() {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 2048,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: 'SHA-256',
    },
    true,
    ['encrypt', 'decrypt']
  )

  const privateKeyBuffer = await crypto.subtle.exportKey(
    'pkcs8',
    keyPair.privateKey
  )
  const privateKeyHex = Buffer.from(privateKeyBuffer).toString('hex')

  const publicKeyBuffer = await crypto.subtle.exportKey(
    'spki',
    keyPair.publicKey
  )
  const publicKeyHex = Buffer.from(publicKeyBuffer).toString('hex')

  return {
    keyPair,
    privateKeyBuffer,
    privateKeyHex,
    publicKeyBuffer,
    publicKeyHex,
  }
}
