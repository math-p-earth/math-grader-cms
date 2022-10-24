import React from 'react'

import { useFormFields } from 'payload/components/forms'

import { LatexMarkdown } from './LatexMarkdown'

interface LatexFieldProps {
  targetFieldName: string
}

/**
 * Renders the field immediately before this field as LaTeX.
 * @param props UI Props for this component. Automatically set by Payload.
 * @returns JSX.Element
 */
export const LatexField = (props: LatexFieldProps) => {
  const source = useFormFields(([fields, dispatch]) => fields[props.targetFieldName])

  if (typeof source.value !== 'undefined') {
    return <LatexMarkdown>{source.value as string}</LatexMarkdown>
  }
  return null
}

interface generateLatexFieldOptions {
  targetFieldName: string
}

export const generateLatexField = ({ targetFieldName }: generateLatexFieldOptions) => {
  return (props: any) => <LatexField {...props} targetFieldName={targetFieldName} />
}
