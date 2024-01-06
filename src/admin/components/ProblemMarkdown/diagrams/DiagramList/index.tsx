import React from 'react'

import { DiagramListBlock } from 'payload/generated-types'

import { ProblemMarkdown } from '../..'
import './index.scss'

interface DiagramListProps {
  diagram: DiagramListBlock
}

const baseClass = 'diagram-list'

export const DiagramList: React.FC<DiagramListProps> = ({ diagram }) => {
  const { items } = diagram

  return (
    <div className={baseClass}>
      {items.map((item, i) => (
        <ProblemMarkdown key={i}>{`$(${i + 1})$ ${item.content}`}</ProblemMarkdown>
      ))}
    </div>
  )
}
