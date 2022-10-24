import React from 'react'

import { useFormFields } from 'payload/components/forms'
import { useDocumentInfo } from 'payload/components/utilities'
import { Field } from 'payload/types'

const ReactMarkdown = React.lazy(() => import('react-markdown'))

let rehypeKatex: any
let remarkFrontmatter: any
let remarkGfm: any
let remarkMath: any
;(async () => {
  if (typeof window !== 'undefined') {
    rehypeKatex = (await import('rehype-katex')).default
    remarkFrontmatter = (await import('remark-frontmatter')).default
    remarkGfm = (await import('remark-gfm')).default
    remarkMath = (await import('remark-math')).default
  }
})()

interface UIFieldProps {
  name: string
}

/**
 * Renders the field immediately before this field as LaTeX.
 * @param props UI Props for this component. Automatically set by Payload.
 * @returns JSX.Element
 */
export const RenderLatexField = (props: UIFieldProps) => {
  const { collection } = useDocumentInfo()
  console.log({
    props,
    collection,
  })
  const currentFieldIndex = collection.fields.findIndex((field: Field) => field.name === props.name)
  if (currentFieldIndex === 0) {
    return null
  }
  const sourceField = collection.fields[currentFieldIndex - 1]
  const source = useFormFields(([fields, dispatch]) => fields[sourceField.name])

  if (typeof source?.value !== 'undefined') {
    // return null
    return (
      <ReactMarkdown
        children={source.value as string}
        remarkPlugins={[remarkMath, remarkGfm, remarkFrontmatter]}
        rehypePlugins={[rehypeKatex]}
      />
    )
  }
  return null
}
