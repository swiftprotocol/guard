import { fromBech32 } from '@cosmjs/encoding'
import { Data, Passkeys, Webauthn } from './api/index.js'
import { API_URL } from './constants.js'
import { authorize, get, revoke, set } from './functions/index.js'
import signMessage from './helpers/signMessage.js'

export * from './helpers/index.js'

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
    address: string,
    key: string,
    value: string,
    recipients: string[]
  ) {
    const rawAddress = fromBech32(address).data
    const hexAddress = Buffer.from(rawAddress).toString('hex')
    const signature = await signMessage(this.privateKey, hexAddress)
    return await set.call(
      this,
      key,
      value,
      recipients,
      signature,
      this.publicKey,
      this.namespace
    )
  }

  public async authorize(address: string, key: string, recipient: string) {
    return await authorize.call(
      this,
      address,
      key,
      recipient,
      this.privateKey,
      this.namespace
    )
  }

  public async revoke(address: string, key: string, recipient: string) {
    return await revoke.call(
      this,
      address,
      key,
      recipient,
      this.privateKey,
      this.namespace
    )
  }
}
