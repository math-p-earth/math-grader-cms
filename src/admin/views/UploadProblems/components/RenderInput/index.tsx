import React from 'react'

import { useField } from 'payload/components/forms'

import z from 'zod'

import { uploadProblemInputSchema } from '../../../../../routes/upload-problems/schema'

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

  let input
  try {
    input = JSON.parse(value)
  } catch (err) {
    return <h3>Invalid JSON</h3>
  }

  let parsedInput: z.infer<typeof uploadProblemInputSchema>
  try {
    parsedInput = uploadProblemInputSchema.parse(input)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return (
        <div>
          <h3>Invalid input</h3>
          <ol>
            {err.issues.map((issue) => (
              <li key={issue.path.join('.')}>
                <h4>{issue.path.join('.')}</h4>
                <p>{issue.message}</p>
              </li>
            ))}
          </ol>
        </div>
      )
    }
    return (
      <div>
        <h3>Invalid input</h3>
      </div>
    )
  }

  return (
    <div>
      {parsedInput.source && (
        <div>
          <h3>Source</h3>
          <p>
            <strong>Name:</strong> {parsedInput.source.name}
          </p>
          <p>
            <strong>Description:</strong> {parsedInput.source.description}
          </p>
          <p>
            <strong>Type:</strong> {parsedInput.source.type}
          </p>
        </div>
      )}
      {parsedInput.problemList && (
        <div>
          <h3>Problem List</h3>
          <p>
            <strong>Name:</strong> {parsedInput.problemList.name}
          </p>
          <p>
            <strong>Description:</strong> {parsedInput.problemList.description}
          </p>
          <p>
            <strong>Type:</strong> {parsedInput.problemList.type}
          </p>
        </div>
      )}
      {parsedInput.problems.map((problem, index) => (
        <div key={index}>
          <h3>Problem {index + 1}</h3>
          <p>{problem.content}</p>
        </div>
      ))}
    </div>
  )
}

export default RenderInput
