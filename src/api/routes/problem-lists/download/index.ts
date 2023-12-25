import { APIError, Forbidden } from 'payload/errors'
import { PayloadRequest } from 'payload/types'

import { Response } from 'express'
import { z } from 'zod'

import { AuthUser } from '../../../../access/type'
import { withErrorHandler } from '../../../errors/handler/withErrorHandler'
import { mathWorkerClient } from '../../../external/math-worker/client'

export const problemListDownloadSchema = z.object({
  problemListId: z.string(),
})

async function problemListDownloadHandler(
  { params, payload, user }: PayloadRequest<AuthUser>,
  res: Response
) {
  if (!user) {
    throw new Forbidden()
  }
  if (!('problemListId' in params)) {
    throw new APIError(`problemListId is required`, 400)
  }
  const problemListId = params.problemListId as string
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

  const { buffer, headers } = await mathWorkerClient.generateProblemListFile(user.id, problemList)
  res.setHeader('Content-Type', headers.get('Content-Type') ?? 'application/pdf')
  res.setHeader(
    'Content-Disposition',
    headers.get('Content-Disposition') ?? `attachment; filename=${problemList.name}.pdf`
  )
  res.send(buffer)
}

export default withErrorHandler(problemListDownloadHandler)
