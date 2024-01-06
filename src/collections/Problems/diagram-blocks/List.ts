import { Block } from 'payload/types'

import { generateLatexField } from '../../../admin/fields/LatexField'

export const DiagramListBlock: Block = {
  slug: 'diagram-list',
  labels: {
    singular: 'List',
    plural: 'Lists',
  },
  interfaceName: 'DiagramListBlock',
  fields: [
    {
      name: 'itemsPerLine',
      type: 'number',
      required: true,
      defaultValue: 1,
      validate: (value) => {
        if (Number(value) < 1) {
          return 'Items per line must be positive'
        }
        return true
      },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'content',
          type: 'textarea',
          required: true,
          admin: {
            description:
              'Content of the problem in markdown. Supports LaTeX. Does not support nested diagrams.',
          },
        },
        {
          name: 'contentLatex',
          type: 'ui',
          admin: {
            components: {
              Field: generateLatexField({
                targetFieldName: '__PATH__.content',
              }),
            },
          },
        },
      ],
    },
  ],
}
