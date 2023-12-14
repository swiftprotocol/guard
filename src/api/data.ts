import axios from 'axios'
import { ErrorResponse } from '../types/api.js'
import type { SymmKey } from '../types/database.js'

export interface GetResponse {
  symmetricKey: SymmKey
  cipherText: string
  symmetricKeys: SymmKey[]
}

export interface SetResponse {
  hexAddress: string
  key: string
}

export default class Data {
  private api: string

  constructor(api: string) {
    this.api = api
  }

  public async get({
    address,
    key,
    pubkey,
    namespace,
  }: {
    address: string
    key: string
    pubkey: string
    namespace?: string
  }) {
    return await axios.post<GetResponse | ErrorResponse>(
      this.api + '/data/get',
      {
        address,
        key,
        pubkey,
        namespace,
      }
    )
  }

  public async set({
    signature,
    pubkey,
    key,
    symmetricKeys,
    cipherText,
    namespace,
  }: {
    signature: string
    pubkey: string
    key: string
    symmetricKeys: SymmKey[]
    cipherText: string
    namespace?: string
  }) {
    return await axios.post<SetResponse | ErrorResponse>(
      this.api + '/data/set',
      {
        signature,
        pubkey,
        key,
        symmetricKeys,
        cipherText,
        namespace,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
