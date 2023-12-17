import { APIError, Forbidden } from 'payload/errors'
import { PayloadRequest } from 'payload/types'

import { Response } from 'express'
import typia from 'typia'

import { withErrorHandler } from '../../../errors/handler/withErrorHandler'

interface ProblemListDownloadRequest {
  problemListId: string
}

async function problemListDownloadHandler({ body, payload, user }: PayloadRequest, res: Response) {
  if (!user) {
    throw new Forbidden()
  }
  const { problemListId } = typia.assert<ProblemListDownloadRequest>(body)
  const problemList = await payload.findByID({
    collection: 'problem-lists',
    id: problemListId,
    // impersonate user to use collection access control logic
    overrideAccess: false,
    user: user,
    depth: 2, // include problem list -> problem -> source
  })
  if (!problemList) {
    throw new APIError(
      `Problem list with id ${problemListId} not found, or you may not have access to it.`,
      404
    )
  }
  // TODO: call grpc service to generate pdf
  // TODO: return response as pdf
}

export default withErrorHandler(problemListDownloadHandler)
