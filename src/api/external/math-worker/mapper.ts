import {
  DiagramImageBlock,
  DiagramListBlock,
  Media,
  Problem,
  ProblemList,
  Source,
} from 'payload/generated-types'

import { z } from 'zod'

import {
  diagramSchema,
  problemChoiceSchema,
  problemListSchema,
  problemSchema,
  sourceSchema,
} from './client'

export const mapDiagramToContract = (
  diagram: DiagramImageBlock | DiagramListBlock
): z.infer<typeof diagramSchema> => {
  switch (diagram.blockType) {
    case 'diagram-image': {
      const image = diagram.image as Media
      return {
        blockType: diagram.blockType,
        imageUrl: image.url ?? '',
        caption: diagram.caption,
        width: diagram.width ?? image.width,
        height: diagram.height ?? image.width,
      }
    }
    case 'diagram-list': {
      return {
        blockType: diagram.blockType,
        itemsPerLine: diagram.itemsPerLine,
        items: diagram.items.map((item) => ({
          content: item.content,
        })),
      }
    }
  }
}

export const mapProblemChoiceToContract = (
  choice: NonNullable<Problem['choices']>[number]
): z.infer<typeof problemChoiceSchema> => {
  return {
    choice: choice.choice,
    diagrams: choice.diagrams?.map(mapDiagramToContract) ?? [],
  }
}

export const mapSourceToContract = (
  source: string | Source | undefined
): z.infer<typeof sourceSchema> | undefined => {
  if (typeof source === 'string') {
    throw new Error(`source cannot by string`)
  }
  if (!source) {
    return undefined
  }
  return {
    id: source.id,
    name: source.name,
    type: source.type,
  }
}

export const mapProblemToContract = (problem: string | Problem): z.infer<typeof problemSchema> => {
  if (typeof problem === 'string') {
    throw new Error(`problem cannot by string`)
  }
  return {
    id: problem.id,
    type: problem.type,
    content: problem.content,
    source: mapSourceToContract(problem.source),
    choices: problem.choices?.map(mapProblemChoiceToContract) ?? [],
    diagrams: problem.diagrams?.map(mapDiagramToContract) ?? [],
  }
}

export const mapProblemListToContract = (
  problemList: ProblemList
): z.infer<typeof problemListSchema> => {
  return {
    id: problemList.id,
    name: problemList.name,
    type: problemList.type,
    problems: problemList.problems.map(mapProblemToContract),
  }
}
