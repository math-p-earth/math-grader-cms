import React from 'react'

import { DiagramImageBlock } from 'payload/generated-types'

import { useQueryMedia } from '../../../../hooks/useQueryMedia'
import './index.scss'

interface DiagramImageProps {
  diagram: DiagramImageBlock
}

const baseClass = 'diagram-image'

export const DiagramImage: React.FC<DiagramImageProps> = ({ diagram }) => {
  const { query } = useQueryMedia({ image: diagram.image as string })
  if (!query.isSuccess) {
    return null
  }
  const image = query.data

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
