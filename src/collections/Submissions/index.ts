import { CollectionConfig } from 'payload/types'

import { generateLatexField } from '../../admin/components/latex/LatexField'
import { setUserOnCreate } from '../../hooks/field/setUserOnCreate'

export const Submissions: CollectionConfig = {
  slug: 'submissions',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: ({ req }) => {
      return !!req.user // TODO: refactor into an access function in src directory
    },
  },
  fields: [
    {
      name: 'problem',
      relationTo: 'problems',
      type: 'relationship',
      hasMany: false,
      required: true,
    },
    {
      name: 'user',
      relationTo: 'students',
      type: 'relationship',
      hasMany: false,
      required: true,
      hooks: {
        beforeValidate: [setUserOnCreate],
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'PENDING',
      options: [
        // TODO: add more statuses
        {
          label: 'COMPLETED',
          value: 'COMPLETED',
        },
        {
          label: 'PENDING',
          value: 'PENDING',
        },
      ],
    },
    {
      name: 'content',
      type: 'textarea',
    },
    {
      name: 'contentLatex',
      type: 'ui',
      admin: {
        components: {
          Field: generateLatexField({ targetFieldName: 'content' }),
        },
      },
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'uploads',
    },
    {
      name: 'score',
      type: 'number',
    },
    {
      name: 'comment',
      type: 'textarea',
      admin: {
        description: 'Comment for this submission in Markdown (MD).',
      },
    },
  ],
}
