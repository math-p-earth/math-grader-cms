import React from 'react'

import { Label, useField } from 'payload/components/forms'

import { isInputType, isProblemListInput } from '../../parser'

interface RenderInputProps {
  inputPath: string
}

const RenderInput: React.FC<RenderInputProps> = ({ inputPath }) => {
  const { value } = useField<string>({
    path: inputPath,
  })

  if (!value) {
    return null
  }
  try {
    const input = JSON.parse(value)
    if (isProblemListInput(input)) {
      // TODO: render problem list
      return (
        <div>
          <h2>Type: Problem List</h2>
        </div>
      )
    }
    if (isInputType(input?.type)) {
      return <h3>Invalid input for type: {input?.type}</h3>
    }
    return <h3>Invalid input type</h3>
  } catch (e) {
    return <h3>Invalid JSON</h3>
  }
}

export default RenderInput
