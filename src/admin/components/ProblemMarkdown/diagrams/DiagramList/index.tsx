import React from 'react'

import { DiagramListBlock } from 'payload/generated-types'

import { ProblemMarkdown } from '../..'
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
  const { itemsPerLine, items } = diagram

  const gridCol = gridCols[itemsPerLine] ?? gridCols[1]

  return (
    <div className={cn('pl-4 grid', gridCol)}>
      {items.map((item, i) => (
        <ProblemMarkdown key={i}>{`$(${i + 1})$ ${item.content}`}</ProblemMarkdown>
      ))}
    </div>
  )
}
