import React from 'react'

import { ProblemCard, ProblemCardProblemItem } from '../ProblemCard'
import './index.scss'

interface ProblemCardListProps {
  problems: ProblemCardProblemItem[]
}

const baseClass = 'problem-card-list'

export const ProblemCardList: React.FC<ProblemCardListProps> = ({ problems }) => {
  return (
    <div className={baseClass}>
      {problems.map((problem, i) => (
        <ProblemCard key={i} problem={problem} number={i + 1} />
      ))}
    </div>
  )
}
