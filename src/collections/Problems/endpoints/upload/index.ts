import { PayloadRequest } from 'payload/types'

import { NextFunction, Response } from 'express'
import z from 'zod'

import { Problem, ProblemList, Source } from '../../../../payload-types'
import { problemsUploadSchema } from './schema'

const zodSchema = z.object({
  input: problemsUploadSchema,
})

export const problemsUploadHandler = async (
  req: PayloadRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { payload } = req
    const { input } = zodSchema.parse(req.body)

    // create problems
    // TODO: add support for tags
    const problems = await Promise.all(
      input.problems.map(async (problemInput) => {
        return payload.create<Problem>({
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
      source = await payload.create<Source>({
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
      problemList = await payload.create<ProblemList>({
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
  } catch (err) {
    // TODO: extract zod error handler to separate file
    if (err instanceof z.ZodError) {
      next({
        message: err.issues,
      })
    }
    next(err)
  }
}
