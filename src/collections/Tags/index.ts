import { CollectionConfig } from 'payload/types'

import { hasRoles } from '../../access/hasRoles'
import { isLoggedIn } from '../../access/isLoggedIn'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: isLoggedIn,
    create: hasRoles(['EDITOR']),
    update: hasRoles(['EDITOR']),
    delete: hasRoles(['EDITOR']),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}
