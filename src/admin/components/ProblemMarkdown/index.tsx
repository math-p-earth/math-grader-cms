import React, { ReactNode } from 'react'

import { LatexMarkdown } from '../../fields/LatexField/LatexMarkdown'
import {
  DiagramBlock,
  ProblemDiagram,
  getDiagramPlaceholder,
  isDiagramPlaceholderExist,
} from './diagrams'

interface ProblemMarkdownProps {
  children: string
  diagrams?: DiagramBlock[]
}

export const ProblemMarkdown = ({ children: source, diagrams = [] }: ProblemMarkdownProps) => {
  const components: ReactNode[] = []
  const afterContentDiagrams: ReactNode[] = []

  diagrams.forEach((diagram, index) => {
    if (isDiagramPlaceholderExist(source, index)) {
      // if placeholder is found, replace it with the diagram
      const [left, right] = source.split(getDiagramPlaceholder(index))
      components.push(
        <LatexMarkdown key={`content-${index}`}>{left}</LatexMarkdown>,
        <ProblemDiagram key={`diagram-${index}`} diagram={diagram} />
      )
      source = right
    } else {
      // otherwise, add it to the end
      afterContentDiagrams.push(
        <ProblemDiagram key={`after-content-diagram-${index}`} diagram={diagram} />
      )
    }
  })
  components.push(
    <LatexMarkdown key={`content-end`}>{source}</LatexMarkdown>,
    ...afterContentDiagrams
  )

  return <div>{components}</div>
}
