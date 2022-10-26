import { CollectionConfig, Field } from 'payload/types'

const bookFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'author',
        type: 'text',
        required: true,
      },
      {
        name: 'isbn',
        type: 'text',
        label: 'ISBN',
        required: true,
      },
    ],
  },
]

const paperFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'timeLimit',
        type: 'number',
        required: true,
        admin: {
          placeholder: 'Time limit in minutes',
        },
      },
      {
        name: 'datePublished',
        type: 'date',
        admin: {
          date: {
            pickerAppearance: 'dayOnly',
          },
        },
      },
    ],
  },
]

export const Sources: CollectionConfig = {
  slug: 'sources',
  admin: {
    useAsTitle: 'name',
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
          label: 'Generic',
          value: 'GENERIC',
        },
        {
          label: 'Book',
          value: 'BOOK',
        },
        {
          label: 'Paper',
          value: 'PAPER',
        },
      ],
      defaultValue: 'GENERIC',
      required: true,
    },
    {
      name: 'book',
      label: 'Book Details',
      type: 'group',
      fields: bookFields,
      admin: {
        condition: (data) => data.type === 'BOOK',
        hideGutter: true,
      },
    },
    {
      name: 'paper',
      label: 'Paper Details',
      type: 'group',
      fields: paperFields,
      admin: {
        condition: (data) => data.type === 'PAPER',
        hideGutter: false,
      },
    },
  ],
}
