import React, { useState } from 'react'

import { DiagramTableBlock } from 'payload/generated-types'

import { diagramTableDataSchema } from '../../../../../collections/Problems/diagram-blocks/Table'
import { LatexMarkdown } from '../../../../fields/LatexField/LatexMarkdown'

interface DiagramTableProps {
  diagram: DiagramTableBlock
}

export const DiagramTable: React.FC<DiagramTableProps> = ({ diagram: rawDiagram }) => {
  const [diagram] = useState<DiagramTableBlock>(rawDiagram)
  const result = diagramTableDataSchema.safeParse(diagram.data)
  if (!result.success) {
    return <div>Parse error: {result.error.message}</div>
  }
  // TODO: do more check before rendering
  const { rows } = result.data

  return (
    <div>
      <table className="border border-collapse border-black">
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              {row.map((cell, idx) => (
                <td key={idx} className="border border-collapse border-black px-2 text-center">
                  <LatexMarkdown
                    options={{
                      disablePMarginBottom: true,
                    }}
                  >
                    {cell}
                  </LatexMarkdown>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
