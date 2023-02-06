import { Access, CollectionConfig } from 'payload/types'

import { hasRoles } from '../../access/hasRoles'
import { UserTypes, isTypeStudent, isTypeUser } from '../../access/type'
import { generateLatexField } from '../../admin/components/latex/LatexField'
import { Course, Problem, ProblemList } from '../../payload-types'

const ProblemsReadAccess: Access<Problem, UserTypes> = ({ req: { user } }) => {
  if (isTypeUser(user)) {
    return user.roles.includes('ADMIN') || user.roles.includes('EDITOR')
  }
  if (isTypeStudent(user)) {
    const courses = user.courses as Course[]
    const problemLists = courses.flatMap((course) => course.problemLists as ProblemList[])

    // problems is string[] because of student depth = 2
    const problemIds = problemLists.flatMap((problemList) => problemList.problems as string[])

    return {
      id: {
        in: problemIds,
      },
    }
  }
  return false
}

export const Problems: CollectionConfig = {
  slug: 'problems',
  admin: {
    useAsTitle: 'content',
  },
  access: {
    read: ProblemsReadAccess, // TODO: allow reading only if student is enrolled in course
    create: hasRoles(['EDITOR']),
    update: hasRoles(['EDITOR']),
    delete: hasRoles(['EDITOR']),
  },
  fields: [
    {
      name: 'content',
      type: 'textarea',
      admin: {
        description: 'Content of the problem in markdown. Supports LaTeX.',
      },
      required: true,
    },
    {
      name: 'contentLatex',
      type: 'ui',
      admin: {
        components: {
          Field: generateLatexField({ targetFieldName: 'content' }),
        },
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        {
          label: 'MCQ',
          value: 'MCQ',
        },
        {
          label: 'SHORT',
          value: 'SHORT',
        },
        {
          label: 'TF',
          value: 'TF',
        },
        {
          label: 'PROOF',
          value: 'PROOF',
        },
      ],
    },
    {
      name: 'choices',
      type: 'array',
      admin: {
        condition: (data: Problem) => data.type === 'MCQ',
      },
      fields: [
        {
          name: 'choice',
          type: 'textarea',
          admin: {
            description: 'Content of the problem in markdown. Supports LaTeX.',
          },
        },
        {
          name: 'choiceLatex',
          type: 'ui',
          admin: {
            components: {
              Field: generateLatexField({ targetFieldName: '__PATH__.choice' }),
            },
          },
        },
      ],
    },
    {
      name: 'answer',
      type: 'textarea',
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
