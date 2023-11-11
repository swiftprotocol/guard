import type { StdTx } from '@cosmjs/amino'
import { Data, Passkeys, Webauthn } from './api/index.js'
import { API_URL } from './constants.js'
import { authorize, get, revoke, set } from './functions/index.js'

export default class Guard {
  public api: string
  public namespace: string | undefined

  private privateKey: string
  public publicKey: string

  public Data: Data
  public Passkeys: Passkeys
  public Webauthn: Webauthn

  constructor(
    publicKeyHex: string,
    privateKeyHex: string,
    { api, namespace }: { api?: string; namespace?: string }
  ) {
    this.api = api || API_URL
    this.namespace = namespace

    this.publicKey = publicKeyHex
    this.privateKey = privateKeyHex

    // Init API classes
    this.Data = new Data(this.api)
    this.Passkeys = new Passkeys(this.api)
    this.Webauthn = new Webauthn(this.api)
  }

  public async get(address: string, key: string): Promise<string> {
    return await get.call(this, address, key, this.privateKey, this.namespace)
  }

  public async set(
    key: string,
    value: string,
    recipients: string[],
    signature: StdTx
  ) {
    return await set.call(
      this,
      key,
      value,
      recipients,
      signature,
      this.namespace
    )
  }

  public async authorize(
    address: string,
    key: string,
    recipient: string,
    signature: StdTx
  ) {
    return await authorize.call(
      this,
      address,
      key,
      recipient,
      this.privateKey,
      signature,
      this.namespace
    )
  }

  public async revoke(
    address: string,
    key: string,
    recipient: string,
    signature: StdTx
  ) {
    return await revoke.call(
      this,
      address,
      key,
      recipient,
      this.privateKey,
      signature,
      this.namespace
    )
  }
}
