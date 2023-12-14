import type { GetAuthorizationsResponse } from '../api/notify.js'
import Guard from '../index.js'
import type { ErrorResponse } from '../types/api.js'
import type { NotificationType } from '../types/notify.js'

export default async function notifyAuthorize(
  this: Guard,
  app: string,
  notificationTypes: NotificationType[],
  signature: string
): Promise<void> {
  const authorizationString = `${app}:${notificationTypes.join('-')}`

  const response = await this.Notify.getAuthorizations({
    pubkey: this.publicKey,
  })

  if (response.status === 200) {
    const { authorizations: currentAuthorizations } =
      response.data as GetAuthorizationsResponse

    // If the authorization already exists, replace it with authorizationString
    const authorizations = currentAuthorizations.filter(
      (authorization) => !authorization.includes(app)
    )

    const newAuthorizations = [...authorizations, authorizationString]

    const newResponse = await this.Notify.setAuthorizations({
      signature,
      pubkey: this.publicKey,
      authorizations: newAuthorizations,
    })

    if (newResponse.status === 200) {
      return
    } else {
      const errorResponse = newResponse.data as ErrorResponse
      throw new Error(
        `/notify/auth returned ${newResponse.status} status with error: ${errorResponse.error}`
      )
    }
  } else {
    const errorResponse = response.data as ErrorResponse
    throw new Error(
      `/notify/auth returned ${response.status} status with error: ${errorResponse.error}`
    )
  }
}
