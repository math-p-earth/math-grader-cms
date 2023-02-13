import { phoneField } from 'payload-plugin-phone-field'
import { Field } from 'payload/types'

import { validateDiscordUsername } from '../../../collections/Students'

export const fields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'nickname',
        type: 'text',
        label: 'Nickname',
        required: true,
      },
      {
        name: 'firstName',
        type: 'text',
        label: 'First Name',
        required: true,
      },
      {
        name: 'lastName',
        type: 'text',
        label: 'Last Name',
        required: true,
      },
      {
        name: 'gender',
        type: 'select',
        label: 'Gender',
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
        name: 'grade',
        type: 'select',
        label: 'Grade',
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
        label: 'School',
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
    label: 'Contact',
    fields: [
      {
        type: 'row',
        fields: [
          phoneField(
            {
              name: 'phone',
              label: 'Phone',
            },
            {
              defaultCountry: 'TH',
            }
          ),
          {
            name: 'discord',
            type: 'text',
            label: 'Discord',
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
    name: 'idToken',
    type: 'text',
    hidden: true,
  },
  {
    name: 'status',
    type: 'select',
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
    // hooks: {
    //   beforeChange: [forceValueOnCreate('PENDING')],
    // },
  },
]
