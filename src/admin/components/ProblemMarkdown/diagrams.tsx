import React, { ReactNode } from 'react'

import { DiagramImageBlock } from 'payload/generated-types'

import { DiagramImage } from './diagrams/DiagramImage'

// add future block types here
const blockTypes = ['diagram-image'] as const
type BlockType = typeof blockTypes[number]

export interface DiagramBlock {
  blockType: BlockType
}

export const isDiagramBlock = (value: unknown): value is DiagramBlock => {
  if (typeof value !== 'object' || value === null) return false

  if (
    'blockType' in value &&
    typeof value['blockType'] === 'string' &&
    blockTypes.includes(value['blockType'] as BlockType)
  ) {
    return true
  }
  return false
}

export const isDiagramBlockArray = (value: unknown): value is DiagramBlock[] => {
  if (!Array.isArray(value)) return false

  for (const item of value) {
    if (!isDiagramBlock(item)) return false
  }
  return true
}

export const renderDiagram = (diagram: DiagramBlock, key: string): ReactNode => {
  switch (diagram.blockType) {
    case 'diagram-image':
      return <DiagramImage key={key} diagram={diagram as unknown as DiagramImageBlock} />
  }
}
