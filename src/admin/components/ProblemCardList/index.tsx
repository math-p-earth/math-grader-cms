import React from 'react'

import { ProblemCard, ProblemCardProblemItem } from '../ProblemCard'
import './index.scss'

interface ProblemCardListProps {
  problems: ProblemCardProblemItem[]
  refreshData?: () => void
}

const baseClass = 'problem-card-list'

export const ProblemCardList: React.FC<ProblemCardListProps> = ({ problems, refreshData }) => {
  return (
    <div className={baseClass}>
      {problems.map((problem, i) => (
        <ProblemCard key={i} problem={problem} number={i + 1} refreshData={refreshData} />
      ))}
    </div>
  )
}
