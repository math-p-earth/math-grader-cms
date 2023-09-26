import { Field, Validate } from 'payload/types'

import { parseProblemUpload } from '../../../api/routes/problems/upload/problem-parser'

const inputValidate: Validate<string> = (value: string) => {
  try {
    parseProblemUpload(value)
    return true
  } catch (err: unknown) {
    if (err instanceof Error) {
      return err.message
    }
    return `${err}`
  }
}

export const fields: Field[] = [
  {
    type: 'relationship',
    name: 'source',
    label: 'Source',
    relationTo: 'sources',
    hasMany: false,
    required: true,
  },
  {
    type: 'code',
    name: 'input',
    label: 'Input',
    admin: {
      language: 'plaintext',
      // description: `
      //   Format:
      //   1. When a line starts with problem marker (problem number and a period), it enters "problem content" mode as a new problem. All text that follows is added to CURRENT problem content
      //   2. If the following line does not start with a problem marker, or choice marker (Thai/English letter and a period.), it is added to CURRENT problem content with trailing and leading spaces removed.
      //   3. When a line starts with choice marker (Thai/English letter and a period.), it enters "choice content" mode as a new choice. All text that follows is added to CURRENT choice content.
      //   4. If the following line does not start with a choice marker, it is added to CURRENT choice content with trailing and leading spaces removed.
      //   5. For problems with no choices, just start the next line with a problem marker.

      //   Examples:
      //   - Problem with choices
      //   """
      //   1. ถ้า $A, B$ และ $C$ เป็นเซตใด ๆ ข้อความที่ถูกต้องคือข้อใด
      //   ก. $A \\cup B \\neq \\emptyset \\rightarrow A \\neq 0$
      //   ข. $A \\cap B=C \\cap B \\rightarrow A=C$
      //   ค. $A \\cup B=C \\cup B \\rightarrow A=C$
      //   จ. $A \\cap B \\neq \\emptyset \\rightarrow A \\neq \\phi$
      //   2. ถ้า $A, B$ และ $C$ เป็นเซตใด ๆ ข้อความที่ถูกต้องคือข้อใด
      //   ก. $A \\cup B \\neq \\emptyset \\rightarrow A \\neq 0$
      //   ข. $A \\cap B=C \\cap B \\rightarrow A=C$
      //   ค. $A \\cup B=C \\cup B \\rightarrow A=C$
      //   จ. $A \\cap B \\neq \\emptyset \\rightarrow A \\neq \\phi$
      //   3. ถ้า $A, B$ และ $C$ เป็นเซตใด ๆ ข้อความที่ถูกต้องคือข้อใด
      //   4. ถ้า $A, B$ และ $C$ เป็นเซตใด ๆ ข้อความที่ถูกต้องคือข้อใด
      //   5. ถ้า $A, B$ และ $C$ เป็นเซตใด ๆ ข้อความที่ถูกต้องคือข้อใด
      //   """
      //   Problem 1-2 have 4 choices each, problem 3-5 have no choice.
      // `,
    },
    validate: inputValidate,
    required: true,
  },
]
