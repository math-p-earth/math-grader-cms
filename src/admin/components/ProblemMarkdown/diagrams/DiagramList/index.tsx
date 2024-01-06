import React from 'react'

import { DiagramListBlock } from 'payload/generated-types'

import { DiagramListOrderScheme } from '../../../../../collections/Problems/diagram-blocks/List'
import { LatexMarkdown } from '../../../../fields/LatexField/LatexMarkdown'
import { cn } from '../../../../utils/cn'

interface DiagramListProps {
  diagram: DiagramListBlock
}

const gridCols: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
}

export const DiagramList: React.FC<DiagramListProps> = ({ diagram }) => {
  const { itemsPerLine, orderScheme, items } = diagram

  const gridCol = gridCols[itemsPerLine] ?? gridCols[1]

  return (
    <div className={cn('pl-4 grid', gridCol)}>
      {items.map((item, index) => (
        <span key={index} className="flex gap-2">
          {orderScheme !== 'unordered:none' && (
            <LatexMarkdown>{getRowPrefix(index, orderScheme)}</LatexMarkdown>
          )}
          <LatexMarkdown>{item.content}</LatexMarkdown>
        </span>
      ))}
    </div>
  )
}

function getRowPrefix(index: number, orderScheme: DiagramListOrderScheme): string {
  switch (orderScheme) {
    case 'unordered:none':
      return ''
    case 'unordered:bullet':
      return '•  '
    case 'ordered:numbers':
      return `${index + 1}. `
    case 'ordered:latex-numbers':
      return `$(${index + 1})$ `
    case 'ordered:letters-lower':
      return `${String.fromCharCode(97 + index)}. ` // 97 is 'a'
    case 'ordered:letters-upper':
      return `${String.fromCharCode(65 + index)}. ` // 65 is 'A'
    case 'ordered:latex-letters-lower':
      return `$(${String.fromCharCode(97 + index)})$ `
    case 'ordered:latex-letters-upper':
      return `$(${String.fromCharCode(65 + index)})$ `
  }
}
