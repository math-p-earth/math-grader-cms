import { User as PayloadUser } from 'payload/dist/auth/types'

import { Students } from '../collections/Students'
import { Users } from '../collections/Users'
import { Student, User } from '../payload-types'

export type UserTypes = User | Student
export type Role = User['roles'][number]

export const isTypeUser = <U extends PayloadUser>(user: U): user is User & U => {
  return Boolean(user?.collection === Users.slug)
}

export const isTypeStudent = <U extends PayloadUser>(user: U): user is Student & U => {
  return Boolean(user?.collection === Students.slug)
}
