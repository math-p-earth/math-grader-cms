import { FieldHook } from 'payload/types'

export const setUserOnCreate: FieldHook = ({ req: { user }, operation }) => {
  if (operation === 'create') {
    return user?.id
  }
}
