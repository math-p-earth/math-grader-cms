import { useConfig } from 'payload/components/utilities'
import { ErrorResponse } from 'payload/dist/express/responses/formatError'
import { Media } from 'payload/generated-types'

import { useQuery } from '@tanstack/react-query'

import { Media as MediaConfig } from '../../collections/Media'

export interface useQueryMediaOptions {
  image: string | Media
}

export const useQueryMedia = ({ image }: useQueryMediaOptions) => {
  const {
    serverURL,
    routes: { api },
  } = useConfig()

  const query = useQuery<Media, ErrorResponse>({
    queryKey: ['media', image, serverURL, api],
    keepPreviousData: true,
    queryFn: async () => {
      // if image is not string, treat as Media, no need to query
      if (typeof image !== 'string') {
        return image
      }
      // if image is string, treat as id
      const response = await fetch(`${serverURL}${api}/${MediaConfig.slug}/${image}`, {
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
