import { useConfig } from 'payload/components/utilities'
import { PaginatedDocs } from 'payload/database'
import { ErrorResponse } from 'payload/dist/express/responses/formatError'
import { Problem, Source } from 'payload/generated-types'
import { Where } from 'payload/types'

import { useQuery } from '@tanstack/react-query'
import qs from 'qs'

import { Problems } from '../../collections/Problems'

export interface ProblemFilter {
  searchInput?: string
  ids?: string[]
  sourceId?: string
  tagId?: string
  limit?: number
  page?: number
  resultOnNoFilter?: 'empty' | 'all'
}

export const useFilterProblems = ({
  searchInput,
  ids,
  sourceId,
  tagId,
  limit,
  page = 1,
  resultOnNoFilter = 'empty',
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

  let limitQuery: {
    limit?: number
    page?: number
  } = {}
  if (limit) {
    limitQuery = {
      limit: limit,
      page: page,
    }
  }
  if (ids) {
    limitQuery = {
      limit: ids.length,
      page: 1,
    }
  }

  const problemQueryParams: {
    [key: string]: unknown
    where: Where
  } = {
    where: {
      ...(ids && { id: { in: ids } }),
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
    ...limitQuery,
  }

  const query = useQuery<PaginatedDocs<Problem>, ErrorResponse>({
    queryKey: [
      'problems',
      problemQueryParams,
      sourceId,
      serverURL,
      api,
      ids,
      ids?.length,
      tagId,
      searchInput,
      resultOnNoFilter,
    ],
    keepPreviousData: true,
    queryFn: async () => {
      if (sourceId) {
        const sourceResponse = await fetch(
          `${serverURL}${api}/sources?${qs.stringify(sourceQueryParams)}`,
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
      if (
        resultOnNoFilter === 'empty' &&
        (!ids || ids.length === 0) &&
        !sourceId &&
        !tagId &&
        !searchInput
      ) {
        return emptyPaginatedDocs
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
      if (ids) {
        // sort by position in ids
        problems.docs = problems.docs.sort((a, b) => {
          return ids.indexOf(a.id) - ids.indexOf(b.id)
        })
      }
      return problems
    },
  })

  return { query }
}

const emptyPaginatedDocs: PaginatedDocs = {
  docs: [],
  totalDocs: 0,
  limit: 1,
  totalPages: 1,
  page: 1,
  pagingCounter: 1,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: null,
  nextPage: null,
}
