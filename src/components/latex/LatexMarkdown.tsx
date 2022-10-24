import React from 'react'

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
