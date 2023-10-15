import { useConfig } from 'payload/components/utilities'
import { PaginatedDocs } from 'payload/database'
import { ErrorResponse } from 'payload/dist/express/responses/formatError'
import { Tag } from 'payload/generated-types'
import { Where } from 'payload/types'

import { useQuery } from '@tanstack/react-query'
import qs from 'qs'

import { Tags } from '../../collections/Tags'

export interface TagFilter {
  searchInput?: string
  ids?: string[]
  limit?: number
  page?: number
}

export const useFilterTags = ({ searchInput, ids, limit, page = 1 }: TagFilter) => {
  const {
    serverURL,
    routes: { api },
  } = useConfig()

  const tagQueryParams: {
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

  const query = useQuery<PaginatedDocs<Tag>, ErrorResponse>({
    queryKey: ['tags', tagQueryParams, serverURL, api],
    keepPreviousData: true,
    queryFn: async () => {
      const response = await fetch(
        `${serverURL}${api}/${Tags.slug}?${qs.stringify(tagQueryParams)}`,
        {
          credentials: 'include',
        }
      )
      if (!response.ok) {
        throw new Error(`Failed to fetch tags: ${response.text()}`)
      }

      const tags: PaginatedDocs<Tag> = await response.json()
      return tags
    },
  })

  return { query }
}
