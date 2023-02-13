import z from 'zod'

export const studentsRegisterSchema = z.object({
  nickname: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER', 'RATHER_NOT_SAY']),
  grade: z.enum(['M4', 'M5', 'M6']),
  school: z.string(),
  contact: z
    .object({
      phone: z.string().optional(),
      discord: z.string().optional(),
      line: z.string().optional(),
    })
    .optional(),
  idToken: z.string(),
})
