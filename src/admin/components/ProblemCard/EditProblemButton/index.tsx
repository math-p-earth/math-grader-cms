import React from 'react'

import { useDocumentDrawer } from 'payload/dist/admin/components/elements/DocumentDrawer'
import Edit from 'payload/dist/admin/components/icons/Edit'

import { Problems } from '../../../../collections/Problems'
import './index.scss'

const baseClass = 'edit-problem-icon'

interface EditProblemButtonProps {
  problemId: string
  refreshData?: () => void
}

export const EditProblemButton: React.FC<EditProblemButtonProps> = ({ problemId, refreshData }) => {
  const [DocumentDrawer, DocumentDrawerToggler] = useDocumentDrawer({
    id: problemId,
    collectionSlug: Problems.slug,
  })
  return (
    <div className={baseClass}>
      <DocumentDrawerToggler className={`${baseClass}__drawer-toggler`}>
        <Edit />
      </DocumentDrawerToggler>
      <DocumentDrawer
        onSave={
          refreshData
            ? () => {
                refreshData()
              }
            : undefined
        }
      />
    </div>
  )
}
