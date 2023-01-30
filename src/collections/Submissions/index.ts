import { CollectionConfig } from 'payload/types'

import { isAdmin } from '../../access/isAdmin'
import { isLoggedIn } from '../../access/isLoggedIn'
import { isSelf } from '../../access/isSelf'
import { generateLatexField } from '../../admin/components/latex/LatexField'
import { setUserOnCreate } from '../../hooks/field/setUserOnCreate'

export const Submissions: CollectionConfig = {
  slug: 'submissions',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: isSelf('user'),
    create: isLoggedIn,
    update: isAdmin,
    delete: isAdmin,
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
      name: 'student',
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
          label: 'INCORRECT',
          value: 'INCORRECT',
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
