import z from 'zod'

const problemSchema = z.object({
  type: z.enum(['MCQ', 'SHORT', 'TF', 'PROOF']),
  content: z.string(),
  choices: z.array(z.string()).optional(), // TODO: make this required for MCQ
  answer: z.string(),
})

export const problemsUploadSchema = z.object({
  problemList: z
    .object({
      name: z.string(),
      description: z.string().optional(),
      type: z.enum(['DRILL', 'LECTURE_PROBLEM', 'COLLECTION', 'CHALLENGE']),
    })
    .optional(),
  source: z
    .object({
      name: z.string(),
      description: z.string().optional(),
      type: z.enum(['GENERIC', 'BOOK', 'PAPER']),
      book: z
        .object({
          author: z.string(),
          isbn: z.string(),
        })
        .optional(),
      paper: z
        .object({
          timeLimit: z.number(),
          datePublished: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
  problems: z.array(problemSchema),
})
