import { useConfig } from 'payload/components/utilities'
import { ErrorResponse } from 'payload/dist/express/responses/formatError'
import { PaginatedDocs } from 'payload/dist/mongoose/types'
import { Problem, Source } from 'payload/generated-types'
import { Where } from 'payload/types'

import { useQuery } from '@tanstack/react-query'
import qs from 'qs'

import { Problems } from '../../collections/Problems'
import { Sources } from '../../collections/Sources'

export interface ProblemFilter {
  searchInput?: string
  ids?: string[]
  sourceId?: string
  tagId?: string
  limit?: number
  page?: number
}

export const useFilterProblems = ({
  searchInput,
  ids,
  sourceId,
  tagId,
  limit,
  page = 1,
}: ProblemFilter) => {
  const {
    serverURL,
    routes: { api },
  } = useConfig()

  const sourceQueryParams: {
    [key: string]: unknown
    where: Where
  } = {
    where: {
      id: {
        equals: sourceId,
      },
    },
    depth: 0,
  }

  const problemQueryParams: {
    [key: string]: unknown
    where: Where
  } = {
    where: {
      ...(ids && ids.length > 0 && { id: { in: ids } }),
      ...(tagId && { tags: { contains: tagId } }),
      ...(searchInput && {
        or: [
          {
            content: {
              contains: searchInput,
            },
          },
          {
            'choices.choice': {
              contains: searchInput,
            },
          },
        ],
      }),
    },
    ...(limit && { limit: limit, page: page }),
  }

  const query = useQuery<PaginatedDocs<Problem>, ErrorResponse>({
    queryKey: ['problems', problemQueryParams, sourceId, serverURL, api],
    keepPreviousData: true,
    queryFn: async () => {
      if (sourceId) {
        const sourceResponse = await fetch(
          `${serverURL}${api}/${Sources.slug}?${qs.stringify(sourceQueryParams)}`,
          {
            credentials: 'include',
          }
        )
        if (!sourceResponse.ok) {
          throw new Error(`Failed to fetch sources: ${sourceResponse.text()}`)
        }

        const sources: PaginatedDocs<Source> = await sourceResponse.json()
        const problemIds = sources.docs.flatMap((source) => source.problems as string[])

        // add source filter to problem id
        // TODO: move problem-source relationship field from Source to Problem for simpler query. Need to migrate existing data.
        problemQueryParams.where.id = {
          in: problemIds,
        }
      }

      const problemResponse = await fetch(
        `${serverURL}${api}/${Problems.slug}?${qs.stringify(problemQueryParams)}`,
        {
          credentials: 'include',
        }
      )
      if (!problemResponse.ok) {
        throw new Error(`Failed to fetch problems: ${problemResponse.text()}`)
      }

      const problems: PaginatedDocs<Problem> = await problemResponse.json()
      return problems
    },
  })

  return { query }
}
