import { Access, CollectionConfig } from 'payload/types'

import { hasRoles } from '../../access/hasRoles'
import { UserTypes, isTypeApprovedStudent, isTypeUser } from '../../access/type'
import { DownloadProblemListButtonField } from '../../admin/fields/DownloadProblemListButtonField'
import { ProblemSelectField } from '../../admin/fields/ProblemSelectField'
import { Course, ProblemList } from '../../payload-types'

const ProblemListsReadAccess: Access<ProblemList, UserTypes> = ({ req: { user } }) => {
  if (isTypeUser(user)) {
    return user.roles.includes('ADMIN') || user.roles.includes('EDITOR')
  }
  if (isTypeApprovedStudent(user)) {
    const courses = user.courses as Course[]
    const problemLists = courses.flatMap(
      (course) => (course.problemLists ? course.problemLists : []) as ProblemList[]
    )
    const problemListIds = problemLists.map((problemList) => problemList.id)
    return {
      id: {
        in: problemListIds,
      },
    }
  }
  return false
}

export const ProblemLists: CollectionConfig = {
  slug: 'problem-lists',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'description'],
  },
  access: {
    read: ProblemListsReadAccess,
    create: hasRoles(['EDITOR']),
    update: hasRoles(['EDITOR']),
    delete: hasRoles(['EDITOR']),
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
      required: true,
      options: [
        {
          label: 'Drill',
          value: 'DRILL',
        },
        {
          label: 'Lecture Problem',
          value: 'LECTURE_PROBLEM',
        },
        {
          label: 'Collection',
          value: 'COLLECTION',
        },
        {
          label: 'Challenge',
          value: 'CHALLENGE',
        },
      ],
    },
    {
      name: 'problems',
      type: 'relationship',
      relationTo: 'problems',
      hasMany: true,
      defaultValue: () => [],
      required: true,
      admin: {
        components: {
          Field: ProblemSelectField,
        },
      },
    },
    {
      name: 'downloadButton',
      type: 'ui',
      admin: {
        components: {
          Field: DownloadProblemListButtonField,
        },
        position: 'sidebar',
      },
    },
  ],
}
