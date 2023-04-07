import { phoneField } from 'payload-plugin-phone-field'
import { Student } from 'payload/generated-types'
import { Access, CollectionConfig, Validate } from 'payload/types'

import { isAdmin, isAdminFieldAccess } from '../../access/isAdmin'
import { isSelf } from '../../access/isSelf'
import { UserTypes, isTypeApprovedStudent, isTypeUser } from '../../access/type'
import { NODE_ENV } from '../../config'

export const validateDiscordUsername: Validate<string> = (value) => {
  // allow empty
  if (!value) {
    return true
  }

  if (/^(.+?)#\d{4}$/.test(value)) {
    return true
  }
  return 'Discord username should match the format: username#1234'
}

const StudentsReadAccess: Access<Student, UserTypes> = ({ req: { user } }) => {
  if (isTypeUser(user)) {
    return user.roles.includes('ADMIN')
  }
  if (isTypeApprovedStudent(user)) {
    return {
      id: {
        equals: user.id,
      },
    }
  }
  return false
}

export const Students: CollectionConfig = {
  slug: 'students',
  auth: {
    depth: 2, // 2 levels deep, populate student -> courses -> problemLists
    disableLocalStrategy: true,
    cookies:
      NODE_ENV === 'production'
        ? {
            secure: true,
            sameSite: 'none',
          }
        : {
            secure: false,
            sameSite: 'lax',
          },
  },
  admin: {
    useAsTitle: 'nickname',
    group: 'Users',
    defaultColumns: ['nickname', 'firstName', 'lastName', 'grade', 'email'],
  },
  access: {
    read: StudentsReadAccess,
    create: isAdmin, // only admins can create students directly, students must register through /api/students/register
    update: isSelf('id'),
    delete: isAdmin,
    admin: () => false,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
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
      access: {
        update: isAdminFieldAccess,
      },
      admin: {
        position: 'sidebar',
      },
      defaultValue: () => [],
    },
    {
      name: 'googleId',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
  ],
}
