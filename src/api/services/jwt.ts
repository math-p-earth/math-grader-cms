import payload from 'payload'
import { Student } from 'payload/generated-types'
import { SanitizedCollectionConfig } from 'payload/types'

import jwt from 'jsonwebtoken'

export function generateAccessToken(student: Student, collectionConfig: SanitizedCollectionConfig) {
  return jwt.sign(
    {
      email: student.email,
      id: student.id,
      status: student.status,
      nickname: student.nickname,
      firstName: student.firstName,
      lastName: student.lastName,
      collection: collectionConfig.slug,
    },
    payload.secret,
    {
      expiresIn: collectionConfig.auth.tokenExpiration,
    }
  )
}
