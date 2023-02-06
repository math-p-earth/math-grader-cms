import { CollectionConfig } from 'payload/types'

import { hasRoles } from '../../access/hasRoles'
import { isLoggedIn } from '../../access/isLoggedIn'
import { generateLatexField } from '../../admin/components/latex/LatexField'
import { Problem } from '../../payload-types'

export const Problems: CollectionConfig = {
  slug: 'problems',
  admin: {
    useAsTitle: 'content',
  },
  access: {
    read: isLoggedIn, // TODO: allow reading only if student is enrolled in course
    create: hasRoles(['EDITOR']),
    update: hasRoles(['EDITOR']),
    delete: hasRoles(['EDITOR']),
  },
  fields: [
    {
      name: 'content',
      type: 'textarea',
      admin: {
        description: 'Content of the problem in markdown. Supports LaTeX.',
      },
      required: true,
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
      name: 'type',
      type: 'select',
      required: true,
      options: [
        {
          label: 'MCQ',
          value: 'MCQ',
        },
        {
          label: 'SHORT',
          value: 'SHORT',
        },
        {
          label: 'TF',
          value: 'TF',
        },
        {
          label: 'PROOF',
          value: 'PROOF',
        },
      ],
    },
    {
      name: 'choices',
      type: 'array',
      admin: {
        condition: (data: Problem) => data.type === 'MCQ',
      },
      fields: [
        {
          name: 'choice',
          type: 'textarea',
          admin: {
            description: 'Content of the problem in markdown. Supports LaTeX.',
          },
        },
        {
          name: 'choiceLatex',
          type: 'ui',
          admin: {
            components: {
              Field: generateLatexField({ targetFieldName: '__PATH__.choice' }),
            },
          },
        },
      ],
    },
    {
      name: 'answer',
      type: 'textarea',
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
