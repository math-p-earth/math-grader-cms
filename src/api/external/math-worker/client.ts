import { ProblemList } from 'payload/generated-types'

import { initClient, initContract } from '@ts-rest/core'
import { z } from 'zod'

import { diagramTableDataSchema } from '../../../collections/Problems/diagram-blocks/Table'
import { MATH_WORKER_URL } from '../../../config'
import { mapProblemListToContract } from './mapper'

const c = initContract()

export const diagramSchema = z.discriminatedUnion('blockType', [
  z.object({
    blockType: z.literal('diagram-image'),
    imageUrl: z.string(),
    caption: z.string().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
  }),
  z.object({
    blockType: z.literal('diagram-list'),
    itemsPerLine: z.number(),
    items: z.array(
      z.object({
        content: z.string(),
      })
    ),
  }),
  z.object({
    blockType: z.literal('diagram-table'),
    data: diagramTableDataSchema,
  }),
])

export const problemChoiceSchema = z.object({
  choice: z.string(),
  diagrams: z.array(diagramSchema),
})

export const sourceSchema = z.object({
  id: z.string().length(24),
  name: z.string(),
  type: z.enum(['GENERIC', 'BOOK', 'PAPER']),
})

export const problemSchema = z.object({
  id: z.string().length(24),
  content: z.string(),
  type: z.enum(['MCQ', 'SHORT', 'TF', 'PROOF']),
  source: sourceSchema.optional(),
  choices: z.array(problemChoiceSchema),
  diagrams: z.array(diagramSchema),
})

export const problemListSchema = z.object({
  id: z.string().length(24),
  name: z.string(),
  type: z.enum(['DRILL', 'LECTURE_PROBLEM', 'COLLECTION', 'CHALLENGE']),
  problems: z.array(problemSchema),
})

export const generateProblemListFileRequestSchema = z.object({
  userId: z.string().length(24),
  problemList: problemListSchema,
})

export const mathWorkerContract = c.router({
  generateProblemListFile: {
    method: 'POST',
    path: '/generate-problem-list-file',
    responses: {
      200: z.instanceof(Blob),
    },
    body: generateProblemListFileRequestSchema,
  },
})

const rawClient = initClient(mathWorkerContract, {
  baseUrl: MATH_WORKER_URL,
  baseHeaders: {},
})

interface GenerateProblemListFileResult {
  buffer: Buffer
  headers: Headers
}

export const mathWorkerClient = {
  /**
   * @param userId user id
   * @param problemList ProblemList with depth >= 2
   */
  generateProblemListFile: async (
    userId: string,
    problemList: ProblemList
  ): Promise<GenerateProblemListFileResult> => {
    const response = await rawClient.generateProblemListFile({
      body: {
        userId,
        problemList: mapProblemListToContract(problemList),
      },
    })

    if (response.status !== 200) {
      throw new Error(
        `Failed to generate problem list file: ${JSON.stringify(response.body, null, 2)}`
      )
    }

    const buffer = Buffer.from(await response.body.arrayBuffer())

    return {
      buffer: buffer,
      headers: response.headers,
    }
  },
}
