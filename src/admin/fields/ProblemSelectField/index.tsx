import React from 'react'

import { Label, useField } from 'payload/components/forms'
import { RelationshipField } from 'payload/types'

import { Problems } from '../../../collections/Problems'
import { useFilterProblems } from '../../hooks/useFilterProblems'
import { ProblemCardList } from './components/ProblemCardList'
import './index.scss'

export type ProblemSelectProps = Omit<RelationshipField, 'type'> & {
  path?: string
}

export const ProblemSelect: React.FC<ProblemSelectProps> = ({
  path,
  label,
  required,
  relationTo,
}) => {
  if (Array.isArray(relationTo)) {
    throw new Error('Polymorphic relationships are not supported.')
  }
  if (relationTo !== Problems.slug) {
    throw new Error(`Only relationships to '${Problems.slug}' are supported.`)
  }

  const { value: problemIds } = useField<string[]>({ path })
  const { data, isLoading } = useFilterProblems({
    ids: problemIds,
  })
  return (
    <div className="problem-select">
      <Label htmlFor={`field-${path.replace(/\./gi, '__')}`} label={label} required={required} />
      {!isLoading && <ProblemCardList problems={data.docs} />}
    </div>
  )
}
