import type { DecryptParams } from '../types/encryption.js'

import { Crypto } from '@peculiar/webcrypto'
import { TextDecoder } from 'text-encoding'

const textDecoder = new TextDecoder()
const crypto = new Crypto()

export default async function decrypt({
  symmetricKey,
  cipherText,
  recipientPrivateKey,
}: DecryptParams): Promise<string> {
  // Import the recipient's private key
  const recipientPrivateKeyBuffer = Buffer.from(recipientPrivateKey, 'hex')
  const importedPrivateKey = await crypto.subtle.importKey(
    'pkcs8',
    recipientPrivateKeyBuffer,
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    true,
    ['decrypt']
  )

  // Decrypt the AES key with the recipient's private key
  const encryptedAesKeyBuffer = Buffer.from(symmetricKey.key, 'hex')
  const decryptedAesKeyBuffer = await crypto.subtle.decrypt(
    { name: 'RSA-OAEP' },
    importedPrivateKey,
    encryptedAesKeyBuffer
  )

  // Import the decrypted AES key
  const decryptedAesKey = await crypto.subtle.importKey(
    'raw',
    decryptedAesKeyBuffer,
    { name: 'AES-GCM', length: 256 },
    true,
    ['decrypt']
  )

  // Decrypt the private key with the decrypted AES key
  const encryptedPrivateKeyBuffer = Buffer.from(
    symmetricKey.encryptedPrivateKey,
    'hex'
  )
  const decryptedPrivateKeyBuffer = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: Buffer.from(symmetricKey.iv, 'hex') },
    decryptedAesKey,
    encryptedPrivateKeyBuffer
  )

  // Decrypt the cipherText with the decrypted private key
  const cipherTextBuffer = Buffer.from(cipherText, 'hex')
  const importedDecryptedPrivateKey = await crypto.subtle.importKey(
    'pkcs8',
    decryptedPrivateKeyBuffer,
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    true,
    ['decrypt']
  )

  const decryptedData = await crypto.subtle.decrypt(
    { name: 'RSA-OAEP' },
    importedDecryptedPrivateKey,
    cipherTextBuffer
  )

  return textDecoder.decode(decryptedData)
}
