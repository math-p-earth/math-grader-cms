import { useConfig } from 'payload/components/utilities'
import { PaginatedDocs } from 'payload/database'
import { ErrorResponse } from 'payload/dist/express/responses/formatError'
import { Source } from 'payload/generated-types'
import { Where } from 'payload/types'

import { useQuery } from '@tanstack/react-query'
import qs from 'qs'

export interface SourceFilter {
  searchInput?: string
  ids?: string[]
  limit?: number
  page?: number
}

export const useFilterSources = ({ searchInput, ids, limit, page = 1 }: SourceFilter) => {
  const {
    serverURL,
    routes: { api },
  } = useConfig()

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

  const sourceQueryParams: {
    [key: string]: unknown
    where: Where
  } = {
    where: {
      ...(ids && { id: { in: ids } }),
      ...(searchInput && {
        name: {
          contains: searchInput,
        },
      }),
    },
    ...limitQuery,
  }

  const query = useQuery<PaginatedDocs<Source>, ErrorResponse>({
    queryKey: ['sources', sourceQueryParams, serverURL, api, ids],
    keepPreviousData: true,
    queryFn: async () => {
      const response = await fetch(
        `${serverURL}${api}/sources?${qs.stringify(sourceQueryParams)}`,
        {
          credentials: 'include',
        }
      )
      if (!response.ok) {
        throw new Error(`Failed to fetch sources: ${response.text()}`)
      }

      const sources: PaginatedDocs<Source> = await response.json()
      if (ids) {
        // sort by position in ids
        sources.docs = sources.docs.sort((a, b) => {
          return ids.indexOf(a.id) - ids.indexOf(b.id)
        })
      }
      return sources
    },
  })

  return { query }
}
