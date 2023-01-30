import { CollectionConfig } from 'payload/types'

import { hasRoles } from '../../access/hasRoles'
import { isLoggedIn } from '../../access/isLoggedIn'

export const ProblemLists: CollectionConfig = {
  slug: 'problem-lists',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: isLoggedIn, // TODO: allow reading only if student is enrolled in course
    create: hasRoles(['EDITOR']),
    update: hasRoles(['EDITOR']),
    delete: hasRoles(['EDITOR']),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
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
