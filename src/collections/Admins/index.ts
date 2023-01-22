import { CollectionConfig } from 'payload/types'

export const Admins: CollectionConfig = {
  slug: 'admins',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Users',
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
