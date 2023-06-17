import React from 'react'

import { Problem } from 'payload/generated-types'

import { LatexMarkdown } from '../../fields/LatexField/LatexMarkdown'
import { ProblemNumberIcon } from './ProblemNumberIcon'
import './index.scss'

export type ProblemCardProblemItem = Pick<Problem, 'content' | 'choices'>

interface ProblemCardProps {
  problem: ProblemCardProblemItem
  order: number
}

const baseClass = 'problem-card'

export const ProblemCard: React.FC<ProblemCardProps> = ({ problem, order }) => {
  return (
    <div className={baseClass}>
      <ProblemNumberIcon>{order}</ProblemNumberIcon>
      <LatexMarkdown>{problem.content}</LatexMarkdown>
    </div>
  )
}
