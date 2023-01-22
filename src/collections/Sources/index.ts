import { CollectionConfig, Field } from 'payload/types'

import { Source } from '../../payload-types'

const bookFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'author',
        type: 'text',
      },
      {
        name: 'isbn',
        type: 'text',
        label: 'ISBN',
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
  access: {
    read: () => true,
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
      name: 'problems',
      type: 'relationship',
      relationTo: 'problems',
      hasMany: true,
    },
    {
      name: 'book',
      label: 'Book Details',
      type: 'group',
      fields: bookFields,
      admin: {
        condition: (data: Source) => data.type === 'BOOK',
        hideGutter: true,
      },
    },
    {
      name: 'paper',
      label: 'Paper Details',
      type: 'group',
      fields: paperFields,
      admin: {
        condition: (data: Source) => data.type === 'PAPER',
        hideGutter: false,
      },
    },
  ],
}
