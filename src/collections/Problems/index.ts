import { Access, CollectionConfig } from 'payload/types'

import { hasRoles } from '../../access/hasRoles'
import { UserTypes, isTypeApprovedStudent, isTypeUser } from '../../access/type'
import { generateLatexField } from '../../admin/fields/LatexField'
import { BackpopulateField } from '../../fields/Backpopulate'
import { Course, Problem, ProblemList, Source } from '../../payload-types'
import { DiagramImageBlock } from './diagram-blocks/Image'

const ProblemsReadAccess: Access<Problem, UserTypes> = ({ req: { user } }) => {
  if (isTypeUser(user)) {
    return user.roles.includes('ADMIN') || user.roles.includes('EDITOR')
  }
  if (isTypeApprovedStudent(user)) {
    const courses = user.courses as Course[]
    const problemLists = courses.flatMap(
      (course) => (course.problemLists ? course.problemLists : []) as ProblemList[]
    )
    const sources = courses.flatMap((course) => (course.sources ? course.sources : []) as Source[])

    // problems is string[] because of student depth = 2
    const problemIds = [
      ...problemLists.flatMap((problemList) => problemList.problems as string[]),
      ...sources.flatMap((source) => source.problems as string[]),
    ]

    return {
      id: {
        in: problemIds,
      },
    }
  }
  return false
}

// TODO: add index for searching problems
export const Problems: CollectionConfig = {
  slug: 'problems',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['content', 'type', 'tags'],
  },
  access: {
    read: ProblemsReadAccess, // TODO: allow reading only if student is enrolled in course
    create: hasRoles(['EDITOR']),
    update: hasRoles(['EDITOR']),
    delete: hasRoles(['EDITOR']),
  },
  fields: [
    {
      type: 'row',
      fields: [
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
          name: 'tags',
          type: 'relationship',
          relationTo: 'tags',
          hasMany: true,
          defaultValue: () => [],
        },
      ],
    },
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
          Field: generateLatexField({ targetFieldName: 'content', diagramsFieldName: 'diagrams' }),
        },
      },
    },
    {
      name: 'diagrams',
      type: 'blocks',
      blocks: [DiagramImageBlock],
      admin: {
        description:
          "Diagrams are added after the problem's content. Placeholders (<1>, <2>, etc.) can be used to inject diagrams in the middle of the content.",
      },
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
          required: true,
          admin: {
            description: 'Content of the problem in markdown. Supports LaTeX.',
          },
        },
        {
          name: 'choiceLatex',
          type: 'ui',
          admin: {
            components: {
              Field: generateLatexField({
                targetFieldName: '__PATH__.choice',
                diagramsFieldName: '__PATH__.diagrams',
              }),
            },
          },
        },
        {
          name: 'diagrams',
          type: 'blocks',
          blocks: [DiagramImageBlock],
          admin: {
            description:
              "Diagrams are added after the problem's content. Placeholders (<1>, <2>, etc.) can be used to inject diagrams in the middle of the content.",
          },
        },
      ],
    },
    {
      name: 'answer',
      type: 'textarea',
    },
    BackpopulateField({
      name: 'sources',
      label: 'Sources',
      relationFrom: 'sources',
      relationField: 'problems',
    }),
  ],
}
