import { StdTx } from '@cosmjs/amino'
import Guard from '../src'
import {
  decrypt,
  encrypt,
  generateAuthorizationMessage,
  generateKeyPair,
  signMessage,
} from '../src/helpers'
import { api, chainId, namespace } from './constants'
import { generateWallet } from './helpers'

test('Encrypt & Decrypt Data', async () => {
  const { publicKeyHex: senderPublicKey } = await generateKeyPair()
  const {
    privateKeyHex: recipientPrivateKey,
    publicKeyHex: recipientPublicKey,
  } = await generateKeyPair()

  const data = 'Hello World!'
  const encryptedData = await encrypt({
    data,
    recipients: [senderPublicKey, recipientPublicKey],
  })

  const relevantSymmetricKey = encryptedData.symmetricKeys.find(
    (key) => key.recipient === recipientPublicKey
  )

  expect(relevantSymmetricKey).toBeDefined()
  expect(relevantSymmetricKey?.recipient).toBe(recipientPublicKey)

  const decryptedData = await decrypt({
    symmetricKey: relevantSymmetricKey!,
    cipherText: encryptedData.cipherText,
    recipientPrivateKey: recipientPrivateKey,
  })

  expect(decryptedData).toBe(data)
})

test('Get & Set Data with Guard', async () => {
  const wallet = await generateWallet()
  expect(wallet.address).toBeDefined()

  const { publicKeyHex, privateKeyHex } = await generateKeyPair()

  const guard = new Guard(publicKeyHex, privateKeyHex, { api, namespace })
  expect(guard.publicKey).toBe(publicKeyHex)

  const signatureBody = generateAuthorizationMessage()
  const sig = await wallet.signArbitrary(chainId, wallet.address, signatureBody)

  const walletSignature: StdTx = {
    msg: [
      {
        type: 'sign/MsgSignData',
        value: {
          signer: wallet.address,
          data: btoa(signatureBody),
        },
      },
    ],
    fee: { gas: '0', amount: [] },
    memo: '',
    signatures: [sig],
  }

  const signature = await signMessage(privateKeyHex, wallet.hexAddress)

  await guard.Passkeys.set({
    walletSignature,
    signature,
    publicKey: publicKeyHex,
    credential: { id: 'test', publicKey: 'test', algorithm: 'RS256' },
  })

  const key = 'test'
  const value = 'Hello World!'

  await guard.set(wallet.address, key, value, [publicKeyHex])

  const response = await guard.get(wallet.address, key)
  expect(response).toBe(value)
})

test('Authorize & Revoke with Guard', async () => {
  const wallet = await generateWallet()
  expect(wallet.address).toBeDefined()

  const { publicKeyHex, privateKeyHex } = await generateKeyPair()
  const {
    publicKeyHex: recipientPublicKeyHex,
    privateKeyHex: recipientPrivateKeyHex,
  } = await generateKeyPair()

  const guard = new Guard(publicKeyHex, privateKeyHex, { api, namespace })
  expect(guard.publicKey).toBe(publicKeyHex)

  const recipientGuard = new Guard(
    recipientPublicKeyHex,
    recipientPrivateKeyHex,
    { api, namespace }
  )
  expect(recipientGuard.publicKey).toBe(recipientPublicKeyHex)

  const signatureBody = generateAuthorizationMessage()
  const sig = await wallet.signArbitrary(chainId, wallet.address, signatureBody)

  const walletSignature: StdTx = {
    msg: [
      {
        type: 'sign/MsgSignData',
        value: {
          signer: wallet.address,
          data: btoa(signatureBody),
        },
      },
    ],
    fee: { gas: '0', amount: [] },
    memo: '',
    signatures: [sig],
  }

  const signature = await signMessage(privateKeyHex, wallet.hexAddress)

  await guard.Passkeys.set({
    walletSignature,
    signature,
    publicKey: publicKeyHex,
    credential: { id: 'test', publicKey: 'test', algorithm: 'RS256' },
  })

  const key = 'test'
  const value = 'Hello World!'

  await guard.set(wallet.address, key, value, [publicKeyHex])

  const response = await guard.get(wallet.address, key)
  expect(response).toBe(value)

  await guard.authorize(wallet.address, key, recipientPublicKeyHex)

  const recipientResponse = await recipientGuard.get(wallet.address, key)
  expect(recipientResponse).toBe(value)

  await guard.revoke(wallet.address, key, recipientPublicKeyHex)

  try {
    await recipientGuard.get(wallet.address, key)
  } catch (e) {
    expect(e.message).toBe('Request failed with status code 404')
  }
})
