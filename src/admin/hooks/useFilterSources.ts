import { useConfig } from 'payload/components/utilities'
import { ErrorResponse } from 'payload/dist/express/responses/formatError'
import { PaginatedDocs } from 'payload/dist/mongoose/types'
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
    ...(limit && { limit: limit, page: page }),
  }

  const query = useQuery<PaginatedDocs<Source>, ErrorResponse>({
    queryKey: ['sources', sourceQueryParams, serverURL, api],
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
      return sources
    },
  })

  return { query }
}
