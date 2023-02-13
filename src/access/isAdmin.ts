import { Access, FieldAccess } from 'payload/types'

import { isTypeUser } from './type'

/**
 * Returns an access function which returns true if current user is a User and has the "ADMIN" role.
 * @param role Role of user
 */
export const isAdmin: Access = ({ req: { user } }) => {
  if (isTypeUser(user)) {
    return user.roles.includes('ADMIN')
  }
  return false
}

export const isAdminFieldAccess: FieldAccess = ({ req: { user } }) => {
  if (isTypeUser(user)) {
    return user.roles.includes('ADMIN')
  }
  return false
}
