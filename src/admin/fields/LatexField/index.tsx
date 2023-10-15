import React from 'react'

import { useFormFields } from 'payload/components/forms'

import { LatexMarkdown } from './LatexMarkdown'

interface LatexFieldProps {
  targetFieldName: string
  path?: string
}

const PATH_PREFIX = '__PATH__'

// TODO: render diagram components
/**
 * Renders the field immediately before this field as LaTeX.
 * @param props UI Props for this component. Automatically set by Payload.
 * @returns JSX.Element
 */
export const LatexField: React.FC<LatexFieldProps> = ({ targetFieldName, path }) => {
  if (targetFieldName.startsWith(PATH_PREFIX) && path) {
    targetFieldName = targetFieldName.replace(PATH_PREFIX, path)
  }
  const source = useFormFields(([fields, _dispatch]) => fields[targetFieldName])

  if (typeof source?.value !== 'undefined') {
    return <LatexMarkdown>{source?.value as string}</LatexMarkdown>
  }
  return null
}

interface generateLatexFieldOptions {
  targetFieldName: string
}

export const generateLatexField = ({ targetFieldName }: generateLatexFieldOptions) => {
  return (props: LatexFieldProps) => <LatexField {...props} targetFieldName={targetFieldName} />
}
