import React from 'react'

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
}

export const LatexMarkdown = ({ children }: LatexMarkdownProps) => {
  return (
    <ReactMarkdown
      children={children}
      remarkPlugins={[remarkMath, remarkGfm, remarkFrontmatter]}
      rehypePlugins={[rehypeKatex]}
    />
  )
}
