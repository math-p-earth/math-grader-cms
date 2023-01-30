import { Access } from 'payload/config'

import { UserTypes, isTypeUser } from './type'

/**
 * Returns an access function which returns true if current user is either:
 * 1. A User with the role "ADMIN", or
 * 2. A Student with the same id as the user field in target documents
 * @param field Field to compare to user id
 */
export const isSelf: <T>(field: keyof T) => Access<T, UserTypes> = (field) => {
  return ({ req: { user } }) => {
    // Need to be logged in
    if (user) {
      // If user is admin, grant access
      if (isTypeUser(user)) {
        return Boolean(user.roles?.includes('ADMIN'))
      }
      // If user is student, only provide access to themselves based on the user field
      return {
        [field]: {
          equals: user.id,
        },
      }
    }
    return false
  }
}
