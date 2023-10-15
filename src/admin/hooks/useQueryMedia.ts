import { useConfig } from 'payload/components/utilities'
import { ErrorResponse } from 'payload/dist/express/responses/formatError'
import { Media } from 'payload/generated-types'

import { useQuery } from '@tanstack/react-query'

import { Media as MediaConfig } from '../../collections/Media'

export interface useQueryMediaOptions {
  id: string
}

export const useQueryMedia = ({ id }: useQueryMediaOptions) => {
  const {
    serverURL,
    routes: { api },
  } = useConfig()

  const query = useQuery<Media, ErrorResponse>({
    queryKey: ['media', id, serverURL, api],
    keepPreviousData: true,
    queryFn: async () => {
      const response = await fetch(`${serverURL}${api}/${MediaConfig.slug}/${id}`, {
        credentials: 'include',
      })
      if (!response.ok) {
        throw new Error(`Failed to fetch media: ${response.text()}`)
      }

      const media: Media = await response.json()
      return media
    },
  })

  return { query }
}
