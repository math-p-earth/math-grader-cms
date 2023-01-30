import { FieldHook } from 'payload/types'

export const setUserOnCreate: FieldHook = ({ req, operation }) => {
  // TODO: use access functions
  if (req.user.collection == 'student' && operation === 'create') {
    return req.user?.id
  }
}
