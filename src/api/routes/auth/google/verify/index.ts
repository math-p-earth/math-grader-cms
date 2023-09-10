import getCookieExpiration from 'payload/dist/utilities/getCookieExpiration'
import { PayloadRequest } from 'payload/types'

import { CookieOptions, Response } from 'express'
import { LoginTicket } from 'google-auth-library'
import { z } from 'zod'

import { GOOGLE_OAUTH_CLIENT_ID } from '../../../../../config'
import { withErrorHandler } from '../../../../errors/handler/withErrorHandler'
import { oauth2Client } from '../../../../services/google'
import { generateAccessToken } from '../../../../services/jwt'

export const authGoogleVerifySchema = z.object({
  idToken: z.string(),
})

async function handler({ body, payload }: PayloadRequest, res: Response) {
  const { idToken } = authGoogleVerifySchema.parse(body)

  let ticket: LoginTicket
  try {
    ticket = await oauth2Client.verifyIdToken({
      idToken,
      audience: GOOGLE_OAUTH_CLIENT_ID,
    })
  } catch {
    // TODO: refactor to custom error types
    res.status(401).json({
      message: 'Invalid id token',
    })
    return
  }
  const tokenPayload = ticket.getPayload()
  if (!tokenPayload) {
    res.status(401).json({
      message: 'Invalid id token',
    })
    return
  }
  const result = await payload.find({
    collection: 'students',
    where: {
      googleId: {
        equals: tokenPayload.sub,
      },
    },
  })
  if (result.docs.length === 0) {
    res.status(404).json({
      message: 'No student found with id token',
    })
    return
  }

  const collectionConfig = payload.collections.students.config
  const student = result.docs[0]
  const token = generateAccessToken(student, collectionConfig)
  const cookieOptions: CookieOptions = {
    path: '/',
    httpOnly: true,
    expires: getCookieExpiration(collectionConfig.auth.tokenExpiration),
    secure: collectionConfig.auth.cookies.secure,
    sameSite: collectionConfig.auth.cookies.sameSite,
  }

  res.cookie(`${payload.config.cookiePrefix}-token`, token, cookieOptions)
  res.json({
    user: student,
    token,
  })
}

export default withErrorHandler(handler)
