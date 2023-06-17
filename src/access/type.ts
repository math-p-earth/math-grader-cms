import { User as PayloadUser } from 'payload/dist/auth/types'

import { Students } from '../collections/Students'
import { Users } from '../collections/Users'
import { Student, User } from '../payload-types'

export type UserTypes = User | Student
export type AuthUser = UserTypes & PayloadUser
export type Role = User['roles'][number]

export const isTypeUser = <U extends PayloadUser>(user: U | null): user is User & U => {
  return Boolean(user?.collection === Users.slug)
}

export const isTypeStudent = <U extends PayloadUser>(user: U | null): user is Student & U => {
  return Boolean(user?.collection === Students.slug)
}

export const isTypeApprovedStudent = <U extends PayloadUser>(
  user: U | null
): user is Student & U => {
  return Boolean(user?.collection === Students.slug && user?.status === 'APPROVED')
}
