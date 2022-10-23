import { CollectionConfig } from 'payload/types'

export const Drills: CollectionConfig = {
  slug: 'drills',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'problems',
      type: 'relationship',
      relationTo: ['problems'],
      hasMany: true,
    },
  ],
}
