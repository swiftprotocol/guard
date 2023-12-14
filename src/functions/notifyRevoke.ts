import type { GetAuthorizationsResponse } from '../api/notify'
import Guard from '../index.js'
import type { ErrorResponse } from '../types/api.js'

export default async function notifyRevoke(
  this: Guard,
  app: string,
  signature: string
): Promise<void> {
  const response = await this.Notify.getAuthorizations({
    pubkey: this.publicKey,
  })

  if (response.status === 200) {
    const { authorizations: currentAuthorizations } =
      response.data as GetAuthorizationsResponse

    const authorizations = currentAuthorizations.filter(
      (authorization) => !authorization.includes(app)
    )

    const newResponse = await this.Notify.setAuthorizations({
      signature,
      pubkey: this.publicKey,
      authorizations,
    })

    if (newResponse.status === 200) {
      return
    } else {
      const errorResponse = newResponse.data as ErrorResponse
      throw new Error(
        `/notify/setAuthorizations returned ${newResponse.status} status with error: ${errorResponse.error}`
      )
    }
  } else {
    const errorResponse = response.data as ErrorResponse
    throw new Error(
      `/data/get returned ${response.status} status with error: ${errorResponse.error}`
    )
  }
}
