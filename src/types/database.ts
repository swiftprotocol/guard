export interface Row {
  key: string
  value: string
}

export interface SymmKey {
  recipient: string
  key: string
  iv: string
  encryptedPrivateKey: string
}
