import getCookieExpiration from 'payload/dist/utilities/getCookieExpiration'
import { Student } from 'payload/generated-types'
import { PayloadRequest } from 'payload/types'

import { CookieOptions, Response } from 'express'
import { LoginTicket } from 'google-auth-library'

import { GOOGLE_OAUTH_CLIENT_ID } from '../../../../config'
import { withErrorHandler } from '../../../errors/handler/withErrorHandler'
import { oauth2Client } from '../../../services/google'
import { generateAccessToken } from '../../../services/jwt'
import { studentsRegisterSchema } from './schema'

async function handler({ body, payload }: PayloadRequest, res: Response) {
  const input = studentsRegisterSchema.parse(body)

  let ticket: LoginTicket
  try {
    ticket = await oauth2Client.verifyIdToken({
      idToken: input.idToken,
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

  const data: Omit<Student, 'id' | 'updatedAt' | 'createdAt'> = {
    email: tokenPayload.email as string,
    googleId: tokenPayload.sub,
    nickname: input.nickname,
    firstName: input.firstName,
    lastName: input.lastName,
    gender: input.gender,
    grade: input.grade,
    school: input.school,
    contact: {
      phone: input.contact?.phone,
      discord: input.contact?.discord,
      line: input.contact?.line,
    },
    status: 'PENDING',
    courses: [],
  }

  const student = await payload.create({
    collection: 'students',
    data,
  })

  const collectionConfig = payload.collections.students.config
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
