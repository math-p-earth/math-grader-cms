import React from 'react'

import { Problem } from 'payload/generated-types'

import { LatexMarkdown } from '../../../LatexField/LatexMarkdown'
import { ProblemNumberIcon } from '../ProblemNumberIcon'
import './index.scss'

interface ProblemCardProps {
  problem: Problem
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
