import { CollectionConfig } from 'payload/types'

export const Uploads: CollectionConfig = {
  slug: 'uploads',
  upload: {
    staticDir: '../uploads',
    mimeTypes: ['image/*', 'application/pdf'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
}
