import { CollectionConfig } from 'payload/types'

import { isAdmin } from '../../access/isAdmin'
import { isLoggedIn } from '../../access/isLoggedIn'
import { isSelf } from '../../access/isSelf'
import { setUserOnCreate } from '../../hooks/field/setUserOnCreate'

export const Uploads: CollectionConfig = {
  slug: 'uploads',
  upload: {
    staticDir: '../uploads',
    mimeTypes: ['image/*', 'application/pdf'],
  },
  access: {
    read: isSelf('user'),
    create: isLoggedIn,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'students',
      hasMany: false,
      admin: {
        disabled: true,
      },
      hooks: {
        beforeValidate: [setUserOnCreate],
      },
    },
  ],
}
