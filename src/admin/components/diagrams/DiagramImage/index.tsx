import React from 'react'

import { DiagramImageBlock, Media } from 'payload/generated-types'

import { useQueryMedia } from '../../../hooks/useQueryMedia'
import './index.scss'

interface DiagramImageProps {
  diagram: DiagramImageBlock
}

const baseClass = 'diagram-image'

export const DiagramImage: React.FC<DiagramImageProps> = ({ diagram }) => {
  const {
    query: { data, status },
  } = useQueryMedia({ id: diagram.image as string })
  if (status !== 'success') {
    return null
  }
  // TODO: enable ts strict mode so we don't need to cast here
  const image = data as Media

  const width = diagram.width ?? image.width ?? 200
  const height = diagram.height ?? image.height ?? 200
  return (
    <div className={baseClass}>
      <img
        className={`${baseClass}__img`}
        src={image.url}
        alt={image.filename}
        width={width}
        height={height}
        style={{ width, height }}
      />
      {diagram.caption && <caption className={`${baseClass}__caption`}>{diagram.caption}</caption>}
    </div>
  )
}
