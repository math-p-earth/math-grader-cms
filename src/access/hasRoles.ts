import { Access } from 'payload/types'

import { User } from '../payload-types'
import { Role, isTypeUser } from './type'

/**
 * Returns an access function which returns true if current user is a User and has the specified role.
 * @param role Role of user
 */
export const hasRoles: (roles: Role[]) => Access<unknown, User> = (roles: Role[]) => {
  // Admin always have access
  roles.push('ADMIN')
  return ({ req: { user } }) => {
    if (isTypeUser(user)) {
      return user.roles.some((role) => roles.includes(role))
    }
    return false
  }
}
