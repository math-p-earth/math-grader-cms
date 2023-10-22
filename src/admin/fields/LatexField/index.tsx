import React from 'react'

import { useFormFields } from 'payload/components/forms'

import { ProblemMarkdown } from '../../components/ProblemMarkdown'
import { DiagramBlock, isDiagramBlockArray } from '../../components/ProblemMarkdown/diagrams'

interface LatexFieldProps {
  targetFieldName: string
  diagramsFieldName?: string
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
  if (diagramsFieldName && diagramsFieldName.startsWith(PATH_PREFIX) && path) {
    diagramsFieldName = diagramsFieldName.replace(PATH_PREFIX, path)
  }
  const [sourceField, diagramsField] = useFormFields(([fields, _dispatch]) => [
    fields[targetFieldName],
    ...(diagramsFieldName ? [fields[diagramsFieldName]] : []),
  ])
  if (typeof sourceField?.value === 'undefined') {
    return <span>Source field is undefined!</span>
  }
  const source = sourceField?.value as string
  const diagramsValue = diagramsFieldName ? diagramsField?.value : null

  let diagrams: DiagramBlock[] = []
  if (isDiagramBlockArray(diagramsValue)) {
    diagrams = diagramsValue
  }

  return <ProblemMarkdown diagrams={diagrams}>{source}</ProblemMarkdown>
}

interface generateLatexFieldOptions {
  targetFieldName: string
  diagramsFieldName?: string
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
