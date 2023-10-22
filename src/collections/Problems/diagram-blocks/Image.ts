import { Block } from 'payload/types'

import { Media } from '../../Media'

export const DiagramImageBlock: Block = {
  slug: 'diagram-image',
  labels: {
    singular: 'Image',
    plural: 'Images',
  },
  interfaceName: 'DiagramImageBlock',
  fields: [
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: Media.slug,
      required: true,
    },
    {
      name: 'caption',
      label: 'Caption',
      type: 'textarea',
    },
    {
      name: 'width',
      label: 'Width (px)',
      type: 'number',
      admin: {
        description: "Defaults to 400px. Leave blank to use image's width",
      },
      defaultValue: 400,
    },
    {
      name: 'height',
      label: 'Height (px)',
      type: 'number',
      admin: {
        description: "Leave blank to use image's height",
      },
    },
  ],
}
