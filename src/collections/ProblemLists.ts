import { CollectionConfig } from 'payload/types'

export const ProblemLists: CollectionConfig = {
  slug: 'problem-lists',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'Drill',
          value: 'DRILL',
        },
      ],
    },
    {
      name: 'problems',
      type: 'relationship',
      relationTo: ['problems'],
      hasMany: true,
    },
  ],
}
