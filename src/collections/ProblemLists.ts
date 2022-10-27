import { CollectionConfig } from 'payload/types'

export const ProblemLists: CollectionConfig = {
  slug: 'problem-lists',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
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
        {
          label: 'Lecture Problem',
          value: 'LECTURE_PROBLEM',
        },
        {
          label: 'Collection',
          value: 'COLLECTION',
        },
        {
          label: 'Challenge',
          value: 'CHALLENGE',
        },
      ],
    },
    {
      name: 'problems',
      type: 'relationship',
      relationTo: 'problems',
      hasMany: true,
    },
  ],
}
