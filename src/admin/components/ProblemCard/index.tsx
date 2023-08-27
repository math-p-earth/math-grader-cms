import React from 'react'

import { Problem } from 'payload/generated-types'

import { LatexMarkdown } from '../../fields/LatexField/LatexMarkdown'
import { EditProblemButton } from './EditProblemButton'
import { ProblemNumberIcon } from './ProblemNumberIcon'
import './index.scss'

export type ProblemCardProblemItem = Pick<Problem, 'content' | 'choices'> &
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
      <LatexMarkdown>{problem.content}</LatexMarkdown>
      {problem.choices && problem.choices.length > 0 && (
        <ol>
          {problem.choices.map(({ choice, id }) => (
            <li key={id}>
              <LatexMarkdown>{choice}</LatexMarkdown>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
