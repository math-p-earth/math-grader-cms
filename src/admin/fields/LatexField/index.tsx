import React, { ReactNode } from 'react'

import { useFormFields } from 'payload/components/forms'

import { LatexMarkdown } from './LatexMarkdown'
import { isDiagramBlockArray, renderDiagram } from './diagrams'

interface LatexFieldProps {
  targetFieldName: string
  diagramsFieldName: string
  path?: string
}

const PATH_PREFIX = '__PATH__'

/**
 * Renders the field immediately before this field as LaTeX.
 * @param props UI Props for this component. Automatically set by Payload.
 * @returns JSX.Element
 */
export const LatexField: React.FC<LatexFieldProps> = ({
  targetFieldName,
  diagramsFieldName,
  path,
}) => {
  if (targetFieldName.startsWith(PATH_PREFIX) && path) {
    targetFieldName = targetFieldName.replace(PATH_PREFIX, path)
  }
  const [sourceField, diagramsField] = useFormFields(([fields, _dispatch]) => [
    fields[targetFieldName],
    fields[diagramsFieldName],
  ])
  if (typeof sourceField?.value === 'undefined') {
    return <span>Source field is undefined!</span>
  }
  let source = sourceField?.value as string

  const components: ReactNode[] = []
  const afterContentDiagrams: ReactNode[] = []
  const diagrams = diagramsField?.value
  if (isDiagramBlockArray(diagrams)) {
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
  } else {
    return <LatexMarkdown key="content-end">{sourceField?.value as string}</LatexMarkdown>
  }
  components.push(
    <LatexMarkdown key={`content-end`}>{source}</LatexMarkdown>,
    ...afterContentDiagrams
  )

  return <>{components}</>
}

interface generateLatexFieldOptions {
  targetFieldName: string
  diagramsFieldName: string
}

export const generateLatexField = ({
  targetFieldName,
  diagramsFieldName,
}: generateLatexFieldOptions) => {
  return (props: LatexFieldProps) => (
    <LatexField
      {...props}
      targetFieldName={targetFieldName}
      diagramsFieldName={diagramsFieldName}
    />
  )
}
