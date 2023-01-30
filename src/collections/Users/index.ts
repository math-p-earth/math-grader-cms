import { CollectionConfig } from 'payload/types'

import { isAdmin } from '../../access/isAdmin'
import { isSelf } from '../../access/isSelf'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Users',
  },
  access: {
    read: isSelf('id'),
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'roles',
      type: 'select',
      required: true,
      hasMany: true,
      options: [
        {
          label: 'Admin',
          value: 'ADMIN',
        },
        {
          label: 'Editor',
          value: 'EDITOR',
        },
      ],
    },
  ],
}
