import { CollectionConfig } from 'payload/types'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Users',
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
