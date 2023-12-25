import { useCallback } from 'react'

import { toast } from 'sonner'

export const downloadFile = (data: ArrayBuffer, filename: string, type = 'application/pdf') => {
  if (!window) {
    throw new Error('window not found')
  }
  const blob = new Blob([data], { type })
  const url = window?.URL?.createObjectURL(blob)
  const a = document.createElement(`a`)
  a.style.display = `none`
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  a.remove()
}

export const downloadFromResponse = async (response: Response): Promise<string> => {
  const buffer = await response.arrayBuffer()
  const filename = filenameFromResponse(response)
  downloadFile(buffer, filename)
  return filename
}

export const filenameFromResponse = (response: Response): string => {
  const filename =
    response.headers.get('Content-Disposition')?.split('filename=')[1].split('"').join('') ?? ''
  return filename
}

export interface DownloadOptions {
  url: string
  method?: 'GET' | 'POST'
}

export const useDownload = () => {
  const download = useCallback(async ({ url, method = 'GET' }: DownloadOptions) => {
    const promise = fetch(url, {
      method: method,
      credentials: 'include',
    })
    toast.promise(promise, {
      loading: 'Downloading...',
      description: 'This may take up to 10 seconds.',
      success: (response: Response) => {
        const filename = filenameFromResponse(response)
        downloadFromResponse(response)
        return `Downloaded ${filename}!`
      },
      error: 'Error downloading file.',
    })
  }, [])

  return {
    download,
  }
}
