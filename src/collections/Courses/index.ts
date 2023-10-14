import { Access, CollectionConfig } from 'payload/types'

import { isAdmin } from '../../access/isAdmin'
import { UserTypes, isTypeApprovedStudent, isTypeUser } from '../../access/type'
import { Course } from '../../payload-types'

const CoursesReadAccess: Access<Course, UserTypes> = ({ req: { user } }) => {
  if (isTypeUser(user)) {
    return user.roles.includes('ADMIN')
  }
  if (isTypeApprovedStudent(user)) {
    const courses = (user.courses ?? []) as Course[]
    return {
      id: {
        in: courses.map((course) => course.id),
      },
    }
  }
  return false
}

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'problemLists', 'sources'],
  },
  access: {
    read: CoursesReadAccess,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'problemLists',
      type: 'relationship',
      relationTo: 'problem-lists',
      hasMany: true,
      defaultValue: () => [],
    },
    {
      name: 'sources',
      type: 'relationship',
      relationTo: 'sources',
      hasMany: true,
      defaultValue: () => [],
    },
  ],
}
