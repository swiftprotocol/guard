import type { EncryptParams, EncryptResult } from '../types/encryption.js'

import { Crypto } from '@peculiar/webcrypto'
import { TextEncoder } from 'text-encoding'

export default async function encrypt({
  data,
  recipients,
}: EncryptParams): Promise<EncryptResult> {
  const textEncoder = new TextEncoder()
  const crypto = typeof window !== 'undefined' ? window.crypto : new Crypto()

  // Generate an RSA-OAEP key pair
  const keyPair = await crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 1024,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: 'SHA-256',
    },
    true,
    ['encrypt', 'decrypt']
  )

  // Encrypt the plaintext data using the public key
  const plainTextEncoded = textEncoder.encode(data.toString())
  const encryptedData = await crypto.subtle.encrypt(
    { name: 'RSA-OAEP' },
    keyPair.publicKey,
    plainTextEncoded
  )

  // Export the private key to PKCS8 format
  const privateKeyBuffer = await crypto.subtle.exportKey(
    'pkcs8',
    keyPair.privateKey
  )

  const encryptedKeysPromise = recipients.map(async (recipient) => {
    const recipientPublicKeyBuffer = Buffer.from(recipient, 'hex')
    const recipientPublicKey = await crypto.subtle.importKey(
      'spki',
      recipientPublicKeyBuffer,
      {
        name: 'RSA-OAEP',
        hash: 'SHA-256',
      },
      true,
      ['encrypt']
    )

    // Generate a random AES key
    const aesKey = await crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    )

    // Generate a random iv
    const iv = crypto.getRandomValues(new Uint8Array(12))

    // Encrypt the private key with the AES key
    const encryptedPrivateKey = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      aesKey,
      privateKeyBuffer
    )

    // Export the AES key to raw format
    const aesKeyBuffer = await crypto.subtle.exportKey('raw', aesKey)

    // Encrypt the AES key with the RSA public key
    const encryptedAesKey = await crypto.subtle.encrypt(
      { name: 'RSA-OAEP' },
      recipientPublicKey,
      aesKeyBuffer
    )

    return {
      recipient,
      key: Buffer.from(encryptedAesKey).toString('hex'),
      encryptedPrivateKey: Buffer.from(encryptedPrivateKey).toString('hex'),
      iv: Buffer.from(iv).toString('hex'),
    }
  })

  const encryptedKeys = await Promise.all(encryptedKeysPromise)

  return {
    symmetricKeys: encryptedKeys,
    cipherText: Buffer.from(encryptedData).toString('hex'),
  }
}
