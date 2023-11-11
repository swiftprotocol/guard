import type {
  RegistrationEncoded,
  RegistrationParsed,
} from '@swiftprotocol/auth/types'
import axios from 'axios'
import { ErrorResponse } from '../types/api.js'

export interface ChallengeResponse {
  hexAddress: string
  challenge: string
}

export interface VerifyResponse {
  hexAddress: string
  credential: RegistrationParsed['credential']
  client: RegistrationParsed['client']
}

export default class Webauthn {
  private api: string

  constructor(api: string) {
    this.api = api
  }

  public async challenge({ pubkey }: { pubkey: string }) {
    return await axios.post<ChallengeResponse | ErrorResponse>(
      this.api + '/webauthn/challenge',
      {
        pubkey,
      }
    )
  }

  public async verify({
    pubkey,
    registration,
  }: {
    pubkey: string
    registration: RegistrationEncoded
  }) {
    return await axios.post<VerifyResponse | ErrorResponse>(
      this.api + '/webauthn/verify',
      {
        pubkey,
        registration,
      }
    )
  }
}
