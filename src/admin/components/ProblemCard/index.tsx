import React from 'react'

import { Problem } from 'payload/generated-types'

import { ProblemMarkdown } from '../ProblemMarkdown'
import { EditProblemButton } from './EditProblemButton'
import { ProblemNumberIcon } from './ProblemNumberIcon'
import './index.scss'

export type ProblemCardProblemItem = Pick<Problem, 'content' | 'choices' | 'diagrams'> &
  Partial<Pick<Problem, 'id'>>

interface ProblemCardProps {
  problem: ProblemCardProblemItem
  number?: number
  refreshData?: () => void
}

const baseClass = 'problem-card'

export const ProblemCard: React.FC<ProblemCardProps> = ({
  problem,
  number: order,
  refreshData,
}) => {
  return (
    <div className={baseClass}>
      <div className={`${baseClass}__problem-header`}>
        {typeof order !== 'undefined' && <ProblemNumberIcon>{order}</ProblemNumberIcon>}
        {problem.id && <EditProblemButton problemId={problem.id} refreshData={refreshData} />}
      </div>
      <ProblemMarkdown diagrams={problem.diagrams}>{problem.content}</ProblemMarkdown>
      {problem.choices && problem.choices.length > 0 && (
        <ol>
          {problem.choices.map(({ choice, id }) => (
            <li key={id}>
              <ProblemMarkdown>{choice}</ProblemMarkdown>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
