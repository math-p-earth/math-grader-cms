import { FieldHook } from 'payload/types'

import { isTypeUser } from '../../access/type'

/**
 * Returns a BeforeChange field hook which forces a value on create. Only force values if user is not an admin.
 * @param value Value to force on create
 */
export const forceValueOnCreate: (value: unknown) => FieldHook = (value) => {
  return ({ operation, req: { user } }) => {
    if (operation === 'create') {
      // don't force value if user is admin
      if (isTypeUser(user) && user.roles.includes('ADMIN')) {
        return undefined
      }
      return value
    }
  }
}
