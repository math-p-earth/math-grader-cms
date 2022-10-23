import { CollectionConfig } from 'payload/types'

import { flattenText } from '../util/functions/flattenElement'

const populateContentText = async ({ data }) => {
  return {
    ...data,
    contentText: flattenText(data.content),
  }
}

export const Problems: CollectionConfig = {
  slug: 'problems',
  admin: {
    useAsTitle: 'contentText',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'contentText',
      type: 'text',
      admin: {
        readOnly: true,
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
  hooks: {
    beforeChange: [populateContentText],
  },
}
