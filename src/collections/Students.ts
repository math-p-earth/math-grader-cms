import { CollectionConfig } from 'payload/types'

export const Students: CollectionConfig = {
  slug: 'students',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'nickname',
      type: 'text'
    },
    {
      name: 'firstName',
      type: "text",
    },
    {
      name: "lastName",
      type: "text"
    },
    {
      name: "grade",
      type: "select",
      options: [
        {
          label: "M4",
          value: "M4"
        },
        {
          label: "M5",
          value: "M5"
        },
        {
          label: "M6",
          value: "M6"
        },
      ]
    },
    {
      name: "school",
      type: "text"
    },
    {
      name: "contact",
      type: "group",
      fields: [
        {
          name: "phone",
          type: "text" // TODO: use phone plugin
        },
        {
          name: "discord",
          type: "text" // TODO: validate discord id syntax
        },
        {
          name: "line",
          type: "text" // TODO: put label as line id
        }
      ]
    }
  ],
}
