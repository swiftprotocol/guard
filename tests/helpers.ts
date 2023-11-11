import { Secp256k1HdWallet } from '@cosmjs/amino'
import { SigningStargateClient } from '@swiftprotocol/stargate'
import { mnemonic, prefix, rpc } from './constants'

export async function getWallet() {
  return await Secp256k1HdWallet.fromMnemonic(mnemonic, { prefix })
}

export async function getSigningStargateClient(
  rpc: string,
  wallet: Secp256k1HdWallet
) {
  return await SigningStargateClient.connectWithSigner(rpc, wallet)
}

export async function generateWallet() {
  const wallet = await getWallet()
  const [account] = await wallet.getAccounts()

  const address = account.address
  const hexPubKey = Buffer.from(account.pubkey.buffer).toString('hex')

  const client = await getSigningStargateClient(rpc, wallet)

  const signArbitrary = async (_: string, signer: string, body: string) => {
    const msg = await client.experimentalAdr36Sign(
      signer,
      Uint8Array.from(Array.from(body).map((c) => c.charCodeAt(0)))
    )

    return msg.signatures[0]
  }

  return { address, hexPubKey, client, signArbitrary }
}
