import React, { memo } from 'react'

import { type ClassValue } from 'clsx'

import { cn } from '../../../utils/cn'
import './index.scss'

const ReactMarkdown = React.lazy(() => import('react-markdown'))

let rehypeKatex: typeof import('rehype-katex')['default']
let remarkFrontmatter: typeof import('remark-frontmatter')['default']
let remarkGfm: typeof import('remark-gfm')['default']
let remarkMath: typeof import('remark-math')['default']
;(async () => {
  if (typeof window !== 'undefined') {
    rehypeKatex = (await import('rehype-katex')).default
    remarkFrontmatter = (await import('remark-frontmatter')).default
    remarkGfm = (await import('remark-gfm')).default
    remarkMath = (await import('remark-math')).default
  }
})()

interface LatexMarkdownProps {
  children: string
  className?: ClassValue
  options?: {
    disablePMarginBottom?: boolean
  }
}

const baseClass = 'latex-markdown'

export const LatexMarkdown = memo(({ children, className, options }: LatexMarkdownProps) => {
  const featureClasses = [...(options?.disablePMarginBottom ? [] : [`${baseClass}_p-mb`])]
  return (
    <div className={cn(baseClass, ...featureClasses, className)}>
      <ReactMarkdown
        children={children}
        remarkPlugins={[remarkMath, remarkGfm, remarkFrontmatter]}
        rehypePlugins={[rehypeKatex]}
      />
    </div>
  )
})
