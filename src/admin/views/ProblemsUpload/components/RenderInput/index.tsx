import React from 'react'

import { useField } from 'payload/components/forms'

import { parseProblemUpload } from '../../../../../api/routes/problems/upload/problem-parser'
import { ProblemCardList } from '../../../../components/ProblemCardList'
import './index.scss'

interface RenderInputProps {
  inputPath: string
}

const RenderInput: React.FC<RenderInputProps> = ({ inputPath }) => {
  const { value: input } = useField<string>({
    path: inputPath,
  })

  if (typeof input === 'undefined') {
    return null
  }

  try {
    const parsedProblems = parseProblemUpload(input)
    return (
      <ProblemCardList
        problems={parsedProblems.map((problem) => ({
          ...problem,
          choices: problem.choices?.map((choice) => ({ choice })),
        }))}
      />
    )
  } catch (err) {
    return (
      <div>
        <h3>Invalid input</h3>
        {err instanceof Error && (
          <p>
            {err.message}
            <br />
            {err.stack && <code>{err.stack}</code>}
          </p>
        )}
      </div>
    )
  }
}

export default RenderInput
