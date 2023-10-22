import React from 'react'

import { DiagramImageBlock, Media } from 'payload/generated-types'

import { useQueryMedia } from '../../../../hooks/useQueryMedia'
import './index.scss'

interface DiagramImageProps {
  diagram: DiagramImageBlock
}

const baseClass = 'diagram-image'

export const DiagramImage: React.FC<DiagramImageProps> = ({ diagram }) => {
  const { query } = useQueryMedia({ image: diagram.image })
  if (!query.isSuccess) {
    return null
  }
  const image = query.data

  const [width, height] = getComputedWidthHeight(image, diagram.width, diagram.height)
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

/**
 * Calculate the width and height of the image based on the given width and height. The aspect ratio is preserved if possible.
 */
function getComputedWidthHeight(image: Media, width?: number, height?: number): [number, number] {
  const imageWidth = image.width ?? 400
  const imageHeight = image.height ?? 400

  const aspectRatio = imageWidth / imageHeight
  if (typeof width === 'undefined' && typeof height === 'undefined') {
    return [imageWidth, imageHeight]
  } else if (typeof width === 'number' && typeof height === 'number') {
    return [width, height]
  }

  if (typeof width === 'number') {
    height = width / aspectRatio
  } else if (typeof height === 'number') {
    width = height * aspectRatio
  }
  return [width as number, height as number]
}
