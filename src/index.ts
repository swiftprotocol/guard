import { fromBech32 } from '@cosmjs/encoding'
import { Data, Notify, Passkeys, Webauthn } from './api/index.js'
import { API_URL } from './constants.js'
import {
  authorize,
  get,
  notifyAuthorize,
  revoke,
  set,
} from './functions/index.js'
import signMessage from './helpers/signMessage.js'
import { NotificationType } from './types/notify.js'

export * from './helpers/index.js'

export default class Guard {
  public api: string
  public namespace: string | undefined

  private privateKey: string
  public publicKey: string

  public Data: Data
  public Passkeys: Passkeys
  public Webauthn: Webauthn
  public Notify: Notify

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
    this.Notify = new Notify(this.api)
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

  public async notifyAuthorize(
    address: string,
    app: string,
    notificationTypes: NotificationType[]
  ) {
    const rawAddress = fromBech32(address).data
    const hexAddress = Buffer.from(rawAddress).toString('hex')
    const signature = await signMessage(this.privateKey, hexAddress)

    return await notifyAuthorize.call(this, app, notificationTypes, signature)
  }

  public async notifyRevoke(address: string, app: string) {
    const rawAddress = fromBech32(address).data
    const hexAddress = Buffer.from(rawAddress).toString('hex')
    const signature = await signMessage(this.privateKey, hexAddress)

    return await notifyAuthorize.call(this, app, signature)
  }
}
