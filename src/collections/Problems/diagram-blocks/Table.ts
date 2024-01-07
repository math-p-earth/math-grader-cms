import { DiagramTableBlock as DiagramTableBlockType } from 'payload/generated-types'
import { Block, Validate } from 'payload/types'

import { z } from 'zod'

const tableDataSchema = z.object({
  data: z.array(z.array(z.string())),
  headerRow: z.array(z.string()).nullable().optional(),
  headerColumn: z.array(z.string()).nullable().optional(),
})

const validateDataField: Validate<
  DiagramTableBlockType['data'],
  unknown,
  DiagramTableBlockType,
  unknown
> = (value, { siblingData }) => {
  const { rows, columns } = siblingData
  console.log({ siblingData })
  if (typeof rows !== 'number') {
    return `"rows" field must be a number: Got ${typeof rows}`
  }
  if (typeof columns !== 'number') {
    return `"columns" field must be a number: Got ${typeof columns}`
  }

  const result = tableDataSchema.safeParse(value)
  if (result.success === false) {
    const errorMsg = result.error.errors
      .map((error) => `${error.path}: ${error.message}`)
      .join('\n')
    console.log({ errorMsg })
    return `Failed to parse data field: ${errorMsg}`
  }
  if (result.data.data.length !== rows) {
    return `Expected ${rows} rows, but got ${result.data.data.length}`
  }
  if (result.data.data.some((row) => row.length !== columns)) {
    return `Expected ${columns} columns, but got ${result.data.data[0].length}`
  }
  if (Array.isArray(result.data.headerRow) && result.data.headerRow.length !== columns) {
    return `Expected ${columns} columns in header row, but got ${result.data.headerRow.length}`
  }
  if (Array.isArray(result.data.headerColumn) && result.data.headerColumn.length !== rows) {
    return `Expected ${rows} rows in header column, but got ${result.data.headerColumn.length}`
  }
  return true
}

export const DiagramTableBlock: Block = {
  slug: 'diagram-table',
  labels: {
    singular: 'Table',
    plural: 'Tables',
  },
  interfaceName: 'DiagramTableBlock',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'rows',
          type: 'number',
          required: true,
          defaultValue: 2,
          admin: {
            description: 'Number of rows',
            width: '25%',
          },
        },
        {
          name: 'columns',
          type: 'number',
          required: true,
          defaultValue: 2,
          admin: {
            description: 'Number of columns',
            width: '25%',
          },
        },
      ],
    },
    {
      name: 'data',
      type: 'json',
      required: true,
      defaultValue: {
        data: [
          ['data', 'data'],
          ['data', 'data'],
        ],
        headerRow: null,
        headerColumn: null,
      },
      validate: validateDataField,
    },
  ],
}
