import payload from 'payload'
import { FieldHook } from 'payload/types'

export const setUserOnCreate: (relationTo: string[]) => FieldHook = (relationTo) => {
  return ({ req: { user }, operation, value }) => {
    if (operation === 'create' && !value) {
      if (!relationTo.includes(user.collection)) {
        payload.logger.warn(
          `This user (${user.id}) from collection (${user.collection}) is not included in relationTo array (${relationTo}). Skipping set user on create hook.`
        )
        return undefined
      }
      if (relationTo.length > 1) {
        return {
          relationTo: user.collection,
          value: user.id,
        }
      }
      return user.id
    }
  }
}
