import { Block } from 'payload/types'

import { DiagramImageBlock } from './Image'
import { DiagramListBlock } from './List'
import { DiagramTableBlock } from './Table'

export const diagramBlockConfigs: Block[] = [DiagramImageBlock, DiagramListBlock, DiagramTableBlock]
