import React, { useState } from 'react'

import { useField } from 'payload/components/forms'
import { Drawer, DrawerToggler } from 'payload/dist/admin/components/elements/Drawer'

import { Transfer } from 'antd'

import { ProblemCard } from '../../../components/ProblemCard'
import { useFilterProblems } from '../../../hooks/useFilterProblems'
import './index.scss'

interface ProblemTransferDrawerProps {
  path: string
  toggleLabel: string
}

const baseClass = 'problem-transfer-drawer'

export const ProblemTransferDrawer: React.FC<ProblemTransferDrawerProps> = ({
  path,
  toggleLabel,
}) => {
  const { value: problemIds, setValue } = useField<string[]>({ path })
  const [searchInput, setSearchInput] = useState('')

  const {
    query: { data: problemsData },
  } = useFilterProblems({ searchInput, limit: 50 })
  const {
    query: { data: selectedProblemsData },
  } = useFilterProblems({ ids: problemIds })
  const problems = [...(problemsData?.docs ?? []), ...(selectedProblemsData?.docs ?? [])].filter(
    // unique filter
    (value, index, arr) => arr.indexOf(value) === index
  )

  const drawerSlug = `problem-transfer-${path}`

  const onChange = (_targetKeys: string[], direction: 'left' | 'right', moveKeys: string[]) => {
    if (direction === 'left') {
      setValue(problemIds.filter((id) => !moveKeys.includes(id)))
      return
    }
    // to keep new problems at the end of the list
    setValue([...problemIds, ...moveKeys])
  }

  return (
    <div className={baseClass}>
      <DrawerToggler slug={drawerSlug} className={`${baseClass}__toggle`}>
        {toggleLabel}
      </DrawerToggler>
      <Drawer slug={drawerSlug} title="Select Problems">
        <div className={`${baseClass}__content`}>
          <Transfer
            dataSource={problems.map((problem) => ({
              ...problem,
              key: problem.id,
            }))}
            render={(problem) => <ProblemCard problem={problem} />}
            targetKeys={problemIds}
            onChange={onChange}
            filterOption={() => true} // to bypass filter option
            showSearch
            onSearch={(direction, value) => {
              if (direction === 'left') {
                setSearchInput(value)
              }
            }}
          />
        </div>
      </Drawer>
    </div>
  )
}
