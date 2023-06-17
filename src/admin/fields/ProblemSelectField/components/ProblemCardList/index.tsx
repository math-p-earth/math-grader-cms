import React from 'react'

import { Problem } from 'payload/generated-types'

import { ProblemCard } from '../ProblemCard'
import './index.scss'

interface ProblemCardListProps {
  problems: Problem[]
}

const baseClass = 'problem-card-list'

export const ProblemCardList: React.FC<ProblemCardListProps> = ({ problems }) => {
  return (
    <div className={baseClass}>
      {problems.map((problem, i) => (
        <ProblemCard key={problem.id} problem={problem} order={i} />
      ))}
    </div>
  )
}
