import { phoneField } from 'payload-plugin-phone-field'
import { CollectionConfig, Validate } from 'payload/types'

import { isAdmin } from '../../access/isAdmin'
import { isSelf } from '../../access/isSelf'

const validateDiscordUsername: Validate<string> = (value) => {
  if (/^(.+?)#\d{4}$/.test(value)) {
    return true
  }
  return 'Discord username should match the format: username#1234'
}

export const Students: CollectionConfig = {
  slug: 'students',
  auth: true,
  admin: {
    useAsTitle: 'nickname',
    group: 'Users',
    defaultColumns: ['nickname', 'firstName', 'lastName', 'grade', 'email'],
  },
  access: {
    read: isSelf('id'),
    create: () => true,
    update: isSelf('id'),
    delete: isAdmin,
    admin: () => false,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'nickname',
          type: 'text',
          required: true,
        },
        {
          name: 'gender',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Male',
              value: 'MALE',
            },
            {
              label: 'Female',
              value: 'FEMALE',
            },
            {
              label: 'Other',
              value: 'OTHER',
            },
            {
              label: 'Rather not say',
              value: 'RATHER_NOT_SAY',
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'grade',
          type: 'select',
          required: true,
          admin: {
            width: '35%',
          },
          options: [
            {
              label: 'M4',
              value: 'M4',
            },
            {
              label: 'M5',
              value: 'M5',
            },
            {
              label: 'M6',
              value: 'M6',
            },
          ],
        },
        {
          name: 'school',
          type: 'text',
          admin: {
            width: '65%',
          },
          required: true,
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        phoneField(
          {
            name: 'phone',
          },
          {
            defaultCountry: 'TH',
          }
        ),
        {
          type: 'row',
          fields: [
            {
              name: 'discord',
              type: 'text',
              admin: {
                description: 'Username format: username#1234',
              },
              validate: validateDiscordUsername,
            },
            {
              name: 'line',
              type: 'text',
              label: 'Line ID',
            },
          ],
        },
      ],
    },
    {
      // TODO: force pending status
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'PENDING',
      admin: {
        position: 'sidebar',
      },
      options: [
        {
          label: 'PENDING',
          value: 'PENDING',
        },
        {
          label: 'APPROVED',
          value: 'APPROVED',
        },
      ],
    },
    {
      name: 'courses',
      type: 'relationship',
      relationTo: 'courses',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
