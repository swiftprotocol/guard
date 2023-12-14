import axios from 'axios'
import type { PushSubscription } from 'web-push'
import type { ErrorResponse } from '../types/api'

export interface SubscribeResponse {
  pubkey: string
}

export interface GetAuthorizationsResponse {
  authorizations: string[]
}

export interface SetAuthorizationsResponse {
  authorizations: string[]
}

export default class Data {
  private api: string

  constructor(api: string) {
    this.api = api
  }

  public async getAuthorizations({ pubkey }: { pubkey: string }) {
    return await axios.post<GetAuthorizationsResponse | ErrorResponse>(
      this.api + '/notify/auth/get',
      {
        pubkey,
      }
    )
  }

  public async setAuthorizations({
    pubkey,
    authorizations,
    signature,
  }: {
    pubkey: string
    authorizations: string[]
    signature: string
  }) {
    return await axios.post<SetAuthorizationsResponse | ErrorResponse>(
      this.api + '/notify/auth/set',
      {
        pubkey,
        authorizations,
        signature,
      }
    )
  }

  public async subscribe({
    app,
    pubkey,
    signature,
    subscription,
  }: {
    app: string
    pubkey: string
    signature: string
    subscription: PushSubscription
  }) {
    return await axios.post<SubscribeResponse | ErrorResponse>(
      this.api + '/notify/subscribe',
      {
        app,
        pubkey,
        signature,
        subscription,
      }
    )
  }
}
