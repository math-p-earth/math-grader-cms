import React from 'react'

import { useField } from 'payload/components/forms'

import z from 'zod'

import { problemsUploadSchema } from '../../../../../api/routes/problems/upload/schema'
import { ProblemCardList } from '../../../../components/ProblemCardList'
import './index.scss'

interface RenderInputProps {
  inputPath: string
}

const RenderInput: React.FC<RenderInputProps> = ({ inputPath }) => {
  const { value } = useField<unknown>({
    path: inputPath,
  })

  if (typeof value === 'undefined') {
    return null
  }

  let input: z.infer<typeof problemsUploadSchema>
  try {
    input = problemsUploadSchema.parse(value)
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
      {input.source ? (
        <div>
          <h3 className="success">Source</h3>
          <p>
            <strong>Name:</strong> {input.source.name}
          </p>
          <p>
            <strong>Description:</strong> {input.source.description}
          </p>
          <p>
            <strong>Type:</strong> {input.source.type}
          </p>
          {input.source.type === 'BOOK' && input.source.book && (
            <ul>
              {input.source.book.author && (
                <li>
                  <strong>Author:</strong> {input.source.book.author}
                </li>
              )}
              {input.source.book.isbn && (
                <li>
                  <strong>ISBN:</strong> {input.source.book.isbn}
                </li>
              )}
            </ul>
          )}
          {input.source.type === 'PAPER' && input.source.paper && (
            <ul>
              {input.source.paper.timeLimit && (
                <li>
                  <strong>Time Limit:</strong> {input.source.paper.timeLimit} minutes
                </li>
              )}
              {input.source.paper.datePublished && (
                <li>
                  <strong>Date Published:</strong>{' '}
                  {new Date(input.source.paper.datePublished).toLocaleDateString()}
                </li>
              )}
            </ul>
          )}
        </div>
      ) : (
        <h3 className="warning">Source not found</h3>
      )}
      {input.problemList ? (
        <div>
          <h3 className="success">Problem List</h3>
          <p>
            <strong>Name:</strong> {input.problemList.name}
          </p>
          <p>
            <strong>Description:</strong> {input.problemList.description}
          </p>
          <p>
            <strong>Type:</strong> {input.problemList.type}
          </p>
        </div>
      ) : (
        <h3 className="warning">Problem list not found</h3>
      )}
      <ProblemCardList problems={input.problems} />
    </div>
  )
}

export default RenderInput
