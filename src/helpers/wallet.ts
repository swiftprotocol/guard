export async function getPublicKey(): Promise<Buffer> {
  if (!window.wallet) throw new Error('Keplr/Leap not installed')
  const offlineSigner = window.wallet.getOfflineSigner('juno-1')
  const accounts = await offlineSigner.getAccounts()
  const publicKey = Buffer.from(accounts[0].pubkey.buffer)

  return publicKey
}