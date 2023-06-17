import { CollectionConfig } from 'payload/types'

import { isAdmin } from '../../access/isAdmin'
import { isLoggedIn } from '../../access/isLoggedIn'
import { isSelf } from '../../access/isSelf'
import { generateLatexField } from '../../admin/fields/LatexField'
import { setUserOnCreate } from '../../hooks/field/setUserOnCreate'

export const Submissions: CollectionConfig = {
  slug: 'submissions',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['id', 'student', 'problem', 'status'],
  },
  access: {
    read: isSelf('student'),
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
        beforeValidate: [setUserOnCreate(['students'])],
      },
    },
    {
      // TODO: make this render more nicely in the dashboard
      name: 'status',
      type: 'radio',
      required: true,
      defaultValue: 'PENDING',
      options: [
        {
          label: 'Correct (Approved)',
          value: 'CORRECT_APPROVED',
        },
        {
          label: 'Correct',
          value: 'CORRECT',
        },
        {
          label: 'Incorrect (Approved)',
          value: 'INCORRECT_APPROVED',
        },
        {
          label: 'Incorrect',
          value: 'INCORRECT',
        },
        {
          label: 'Pending',
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
