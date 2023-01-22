import { Field } from 'payload/types'

import { z } from 'zod'

import { uploadProblemInputSchema } from '../../../collections/Problems/endpoints/upload/schema'

export const fields: Field[] = [
  {
    type: 'json',
    name: 'input',
    label: 'Input JSON',
    required: true,
  },
]
