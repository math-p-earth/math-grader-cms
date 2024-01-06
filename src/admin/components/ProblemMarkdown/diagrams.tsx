import React from 'react'

import { DiagramImageBlock, DiagramListBlock } from 'payload/generated-types'

import { DiagramImage } from './diagrams/DiagramImage'
import { DiagramList } from './diagrams/DiagramList'

// add future block types here
const blockTypes = ['diagram-image', 'diagram-list'] as const
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

export function isDiagramPlaceholderExist(source: string, index: number): boolean {
  return new RegExp(getDiagramPlaceholder(index)).test(source)
}

export function getDiagramPlaceholder(index: number): string {
  return `<${index + 1}>`
}

interface ProblemDiagramProps {
  diagram: DiagramBlock
}

export const ProblemDiagram: React.FC<ProblemDiagramProps> = ({ diagram }) => {
  switch (diagram.blockType) {
    case 'diagram-image':
      return <DiagramImage diagram={diagram as unknown as DiagramImageBlock} />
    case 'diagram-list':
      return <DiagramList diagram={diagram as unknown as DiagramListBlock} />
  }
}
