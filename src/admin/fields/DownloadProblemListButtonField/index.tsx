import React from 'react'

import { Button } from 'payload/components'
import { useDocumentInfo } from 'payload/components/utilities'

import { downloadFile } from '../../hooks/useDownload'

export const DownloadProblemListButtonField: React.FC = () => {
  const { id } = useDocumentInfo()

  return (
    <Button
      onClick={() => {
        downloadFile({
          url: `/api/problem-lists/${id}/download`,
        })
      }}
    >
      Download
    </Button>
  )
}
