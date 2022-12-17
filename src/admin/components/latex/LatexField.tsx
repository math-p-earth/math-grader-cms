import React from 'react'

import { useFormFields } from 'payload/components/forms'

import { LatexMarkdown } from './LatexMarkdown'

interface LatexFieldProps {
  targetFieldName: string
  path?: string
}

const PATH_PREFIX = '__PATH__'

/**
 * Renders the field immediately before this field as LaTeX.
 * @param props UI Props for this component. Automatically set by Payload.
 * @returns JSX.Element
 */
export const LatexField = ({ targetFieldName, path }: LatexFieldProps) => {
  if (targetFieldName.startsWith(PATH_PREFIX) && path) {
    targetFieldName = targetFieldName.replace(PATH_PREFIX, path)
  }
  const source = useFormFields(([fields, dispatch]) => fields[targetFieldName])

  if (typeof source?.value !== 'undefined') {
    return <LatexMarkdown>{source?.value as string}</LatexMarkdown>
  }
  return null
}

interface generateLatexFieldOptions {
  targetFieldName: string
}

export const generateLatexField = ({ targetFieldName }: generateLatexFieldOptions) => {
  return (props: any) => <LatexField {...props} targetFieldName={targetFieldName} />
}
