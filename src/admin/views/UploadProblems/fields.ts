import { Field } from 'payload/types'

import { z } from 'zod'

import { uploadProblemInputSchema } from '../../../routes/upload-problems/schema'

export const fields: Field[] = [
  {
    type: 'textarea',
    name: 'input',
    label: 'Input JSON',
    required: true,
    validate: (value: string) => {
      let jsonValue
      try {
        jsonValue = JSON.parse(value)
      } catch (err) {
        return 'Invalid JSON'
      }

      try {
        uploadProblemInputSchema.parse(jsonValue)
      } catch (err) {
        if (err instanceof z.ZodError) {
          return err.message
        }
        return 'Cannot parse input'
      }

      return true
    },
    admin: {
      placeholder: 'Enter input JSON here!',
    },
  },
]
