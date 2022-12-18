import { NextFunction, Response } from 'express'
import z from 'zod'
import { PayloadRequest } from 'payload/types'
import { Problem, Source } from '../../payload-types'
import { uploadProblemInputSchema } from './schema'
z.ZodError

const zodSchema = z.object({
  input: uploadProblemInputSchema
})

export const uploadProblemsHandler = async (req: PayloadRequest, res: Response, next: NextFunction) => {
  try {
    const { payload } = req
    const { input } = zodSchema.parse(req.body)

    // create source
    let source: Source = null
    if (input.source) {
      source = await payload.create<Source>({
        collection: 'sources',
        data: {
          name: input.source.name,
          description: input.source.description,
          type: input.source.type,
        },
      })
      console.log('created source', source.name)
    }

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
            source: source ? source.id : null,
          },
        })
      })
    )
    console.log('created problems', problems.map((problem) => problem.content))

    // create problem list
    if (input.problemList) {
      const problemList = await payload.create({
        collection: 'problem-lists',
        data: {
          name: input.problemList.name,
          description: input.problemList.description,
          type: input.problemList.type,
          problems: problems.map((problem) => problem.id),
        },
      })
      console.log('created problemList', problemList.name)
    }
    res.send("Success!")
  } catch (err) {
    // TODO: extract zod error handler to separate file
    if (err instanceof z.ZodError) {
      next({
        message: err.issues
      })
    }
    next(err)
  }
}