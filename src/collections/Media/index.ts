import { CollectionConfig } from 'payload/types'

import { hasRoles } from '../../access/hasRoles'
import { isLoggedIn } from '../../access/isLoggedIn'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticURL: '/media',
    staticDir: '../media',
    mimeTypes: ['image/*'],
  },
  access: {
    read: isLoggedIn,
    create: hasRoles(['EDITOR']),
    update: hasRoles(['EDITOR']),
    delete: hasRoles(['EDITOR']),
  },
  fields: [],
}
