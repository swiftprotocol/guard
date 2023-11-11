import type { StdTx } from '@cosmjs/amino'
import type { CredentialKey } from '@swiftprotocol/auth/types'
import axios from 'axios'
import { ErrorResponse } from '../types/api.js'

export interface GetResponse {
  hexAddress: string
  passkey: string
}

export interface SetResponse {
  hexAddress: string
  credential: CredentialKey
}

export default class Passkeys {
  private api: string

  constructor(api: string) {
    this.api = api
  }

  public async get({ pubkey }: { pubkey: string }) {
    return await axios.post<GetResponse | ErrorResponse>(
      this.api + '/passkeys/get',
      {
        pubkey,
      }
    )
  }

  public async set({
    signature,
    credential,
  }: {
    signature: StdTx
    credential: CredentialKey
  }) {
    return await axios.post<SetResponse | ErrorResponse>(
      this.api + '/passkeys/set',
      {
        signature,
        credential,
      }
    )
  }
}
