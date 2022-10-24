import { CollectionConfig } from 'payload/types'

import { RenderLatexField } from '../components/latex/LatexField'

export const Problems: CollectionConfig = {
  slug: 'problems',
  admin: {
    useAsTitle: 'content',
  },
  fields: [
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'content-render',
      type: 'ui',
      label: 'Rendered Content',
      admin: {
        components: {
          Field: RenderLatexField,
        },
      },
    },
    {
      name: 'problemType',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Multiple Choice',
          value: 'multipleChoice',
        },
        {
          label: 'Short Answer',
          value: 'shortAnswer',
        },
        {
          label: 'True/False',
          value: 'trueFalse',
        },
        {
          label: 'Proof',
          value: 'proof',
        },
      ],
    },
    {
      name: 'choices',
      type: 'array',
      admin: {
        condition: (data) => data.problemType === 'multipleChoice',
      },
      fields: [
        {
          name: 'choice',
          type: 'text',
        },
      ],
    },
  ],
}
