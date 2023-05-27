export async function getAccount(chainId: string) {
  if (!window.wallet) throw new Error("Keplr/Leap not installed");
  const offlineSigner = window.wallet.getOfflineSigner(chainId);
  const accounts = await offlineSigner.getAccounts();

  return accounts[0];
}

export async function getPublicKey(chainId: string) {
  if (!window.wallet) throw new Error("Keplr/Leap not installed");
  const offlineSigner = window.wallet.getOfflineSigner(chainId);
  const accounts = await offlineSigner.getAccounts();

  const pubKey = Buffer.from(accounts[0].pubkey.buffer).toString("hex");
  return pubKey;
}
