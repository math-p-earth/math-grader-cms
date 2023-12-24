import React from 'react'

import { Button } from 'payload/components'
import { useDocumentInfo } from 'payload/components/utilities'

import { useDownload } from '../../hooks/useDownload'

export const DownloadProblemListButtonField: React.FC = () => {
  const { id } = useDocumentInfo()
  const { download } = useDownload()

  const onDownload = () => {
    download({
      url: `/api/problem-lists/${id}/download`,
    })
  }

  return <Button onClick={onDownload}>Download</Button>
}
