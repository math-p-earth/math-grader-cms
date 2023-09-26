import { Forbidden } from 'payload/errors'
import { Problem } from 'payload/generated-types'
import { PayloadRequest } from 'payload/types'

import { Response } from 'express'
import z from 'zod'

import { AuthUser, isTypeUser } from '../../../../access/type'
import { withErrorHandler } from '../../../errors/handler/withErrorHandler'
import { parseProblemUpload } from './problem-parser'

const zodSchema = z.object({
  // input: problemsUploadSchema,
  input: z.string(),
  source: z.string(),
})

const canAccess = (user: AuthUser): boolean => {
  if (isTypeUser(user)) {
    return user.roles.includes('ADMIN') || user.roles.includes('EDITOR')
  }
  return false
}

async function handler({ body, payload, user }: PayloadRequest, res: Response) {
  if (!canAccess(user)) {
    throw new Forbidden()
  }
  const { input, source: sourceId } = zodSchema.parse(body)
  const parsedProblems = parseProblemUpload(input)

  // vaildate source
  const source = await payload.findByID({ collection: 'sources', id: sourceId })
  if (!source) {
    throw new Error(`Source with id ${sourceId} not found`)
  }

  // create problems
  const problems = await Promise.all(
    parsedProblems.map(async (problem) => {
      return payload.create({
        collection: 'problems',
        data: {
          type: problem.type,
          content: problem.content,
          choices: problem.choices.map((choice) => ({ choice })),
          tags: [],
        },
      })
    })
  )

  // append new problem ids to list of problems
  const problemIds = [
    ...(source.problems?.map((problem: string | Problem) => {
      if (typeof problem === 'string') {
        return problem
      }
      return problem.id
    }) ?? []),
    ...problems.map((problem) => problem.id),
  ]

  // update source
  await payload.update({
    collection: 'sources',
    id: sourceId,
    data: {
      problems: problemIds,
    },
  })

  const message = `Created ${problems.length} problems and source "${source.name}".`
  res.json({ message, source, problems })
}

export default withErrorHandler(handler)
