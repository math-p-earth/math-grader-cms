import React from 'react'

import { Problem } from 'payload/generated-types'

import { LatexMarkdown } from '../../fields/LatexField/LatexMarkdown'
import { ProblemNumberIcon } from './ProblemNumberIcon'
import './index.scss'

export type ProblemCardProblemItem = Pick<Problem, 'content' | 'choices'>

interface ProblemCardProps {
  problem: ProblemCardProblemItem
  number?: number
}

const baseClass = 'problem-card'

export const ProblemCard: React.FC<ProblemCardProps> = ({ problem, number: order }) => {
  return (
    <div className={baseClass}>
      {typeof order !== 'undefined' && <ProblemNumberIcon>{order}</ProblemNumberIcon>}
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
