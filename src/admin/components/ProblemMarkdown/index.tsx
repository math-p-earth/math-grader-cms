import React, { ReactNode } from 'react'

import { LatexMarkdown } from '../../fields/LatexField/LatexMarkdown'
import { DiagramBlock, renderDiagram } from './diagrams'

interface ProblemMarkdownProps {
  children: string
  diagrams?: DiagramBlock[]
}

export const ProblemMarkdown = ({ children: source, diagrams = [] }: ProblemMarkdownProps) => {
  const components: ReactNode[] = []
  const afterContentDiagrams: ReactNode[] = []

  diagrams.forEach((diagram, index) => {
    if (new RegExp(`<${index + 1}>`).test(source)) {
      // if placeholder is found, replace it with the diagram
      const [left, right] = source.split(`<${index + 1}>`)
      components.push(
        <LatexMarkdown key={`content-${index}`}>{left}</LatexMarkdown>,
        renderDiagram(diagram, `diagram-${index}`)
      )
      source = right
    } else {
      // otherwise, add it to the end
      afterContentDiagrams.push(renderDiagram(diagram, `after-content-diagram-${index}`))
    }
  })
  components.push(
    <LatexMarkdown key={`content-end`}>{source}</LatexMarkdown>,
    ...afterContentDiagrams
  )

  return <div>{components}</div>
}
