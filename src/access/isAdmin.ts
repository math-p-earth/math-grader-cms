import { TypeWithID } from 'payload/dist/collections/config/types'
import { Access, FieldAccess } from 'payload/types'

import { UserTypes, isTypeUser } from './type'

/**
 * Returns an access function which returns true if current user is a User and has the "ADMIN" role.
 * @param role Role of user
 */
export const isAdmin: Access<unknown, UserTypes> = ({ req: { user } }) => {
  if (isTypeUser(user)) {
    return user.roles.includes('ADMIN')
  }
  return false
}

export const isAdminFieldAccess: FieldAccess<TypeWithID, unknown, UserTypes> = ({
  req: { user },
}) => {
  if (isTypeUser(user)) {
    return user.roles.includes('ADMIN')
  }
  return false
}
