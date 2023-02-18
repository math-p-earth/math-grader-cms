import { Access } from 'payload/config'

import { UserTypes, isTypeApprovedStudent, isTypeUser } from './type'

/**
 * Returns an access function which returns true if there is a logged in user from any auth collections.
 */
export const isLoggedIn: Access<unknown, UserTypes> = ({ req: { user } }) => {
  if (isTypeUser(user)) {
    return true
  }
  if (isTypeApprovedStudent(user)) {
    return user.status === 'APPROVED'
  }
  return false
}
