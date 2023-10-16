import { Access } from 'payload/config'

import { UserTypes, isTypeApprovedStudent, isTypeUser } from './type'

/**
 * Returns an access function which returns true if current user is either:
 * 1. A User with the role "ADMIN", or
 * 2. A User or Student with the same id as the user field in target documents
 * @param field Field to compare to user id
 */
export const isSelf: <T>(field: keyof T) => Access<T, UserTypes> = (field) => {
  return ({ req: { user } }) => {
    // If user is admin, grant access
    if (isTypeUser(user) && user.roles.includes('ADMIN')) {
      return true
    }
    if (isTypeUser(user) || isTypeApprovedStudent(user)) {
      // Otherwise, only provide access to themselves based on the given relationship field
      return {
        or: [
          {
            [field]: {
              equals: user.id,
            },
          },
          // TODO: investigate why polymorphic relationships query don't work
          // {
          //   [`${String(field)}.relationTo`]: {
          //     equals: user.collection,
          //   },
          //   [`${String(field)}.value`]: {
          //     equals: user.id,
          //   },
          // },
        ],
      }
    }
    return false
  }
}
