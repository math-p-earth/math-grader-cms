import { CollectionConfig } from 'payload/types'

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
}
