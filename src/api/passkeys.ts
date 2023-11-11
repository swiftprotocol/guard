import type { StdTx } from '@cosmjs/amino'
import type { CredentialKey } from '@swiftprotocol/auth/types'
import axios from 'axios'
import { ErrorResponse } from '../types/api.js'

export interface GetResponse {
  hexAddress: string
  pubkey: string
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

  public async get({ address }: { address: string }) {
    return await axios.post<GetResponse | ErrorResponse>(
      this.api + '/passkeys/get',
      {
        address,
      }
    )
  }

  public async set({
    walletSignature,
    signature,
    publicKey,
    credential,
  }: {
    walletSignature: StdTx
    signature: string
    publicKey: string
    credential: CredentialKey
  }) {
    return await axios.post<SetResponse | ErrorResponse>(
      this.api + '/passkeys/set',
      {
        walletSignature,
        signature,
        publicKey,
        credential,
      }
    )
  }
}
