import { ProblemList, Source } from 'payload/generated-types'
import { PayloadRequest } from 'payload/types'

import { Response } from 'express'
import z from 'zod'

import { withErrorHandler } from '../../../errors/handler/withErrorHandler'
import { problemsUploadSchema } from './schema'

const zodSchema = z.object({
  input: problemsUploadSchema,
})

async function handler({ body, payload }: PayloadRequest, res: Response) {
  const { input } = zodSchema.parse(body)

  // create problems
  // TODO: add support for tags
  const problems = await Promise.all(
    input.problems.map(async (problemInput) => {
      return payload.create({
        collection: 'problems',
        data: {
          type: problemInput.type,
          content: problemInput.content,
          choices: problemInput.choices?.map((choice) => ({ choice })),
          answer: problemInput.answer,
        },
      })
    })
  )

  // create source
  let source: Source
  if (input.source) {
    source = await payload.create({
      collection: 'sources',
      data: {
        name: input.source.name,
        description: input.source.description,
        type: input.source.type,
        book: input.source.book,
        paper: input.source.paper,
        problems: problems.map((problem) => problem.id),
      },
    })
  }

  // create problem list
  let problemList: ProblemList
  if (input.problemList) {
    problemList = await payload.create({
      collection: 'problem-lists',
      data: {
        name: input.problemList.name,
        description: input.problemList.description,
        type: input.problemList.type,
        problems: problems.map((problem) => problem.id),
      },
    })
  }
  let message = problemList
    ? `Created problem list "${problemList.name}" with ${problems.length} problems`
    : `Created ${problems.length} problems`
  if (source) {
    message += ` and source "${source.name}"`
  }
  message += '.'
  res.json({ message, problemList, source, problems })
}

export default withErrorHandler(handler)
