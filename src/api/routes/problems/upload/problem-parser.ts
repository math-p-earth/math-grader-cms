export interface ParsedProblem {
  type: 'MCQ' | 'SHORT'
  content: string
  choices: string[]
}

const problemMarker = /^\d+\./
const choiceMarker = /^[\u0E00-\u0E7Fa-zA-Z]\./

export function parseProblemUpload(input: string): ParsedProblem[] {
  const lines = input.split('\n')
  const problems: ParsedProblem[] = []

  let currentProblem: ParsedProblem | null = null
  let mode: 'problem' | 'choice' = 'problem'
  let lineNumber = 0
  for (const line of lines) {
    lineNumber++
    if (problemMarker.test(line)) {
      mode = 'problem'
      if (currentProblem) {
        if (currentProblem.choices.length > 0) {
          currentProblem.type = 'MCQ'
        } else {
          currentProblem.type = 'SHORT'
        }
        problems.push(currentProblem)
      }
      currentProblem = {
        type: 'SHORT',
        content: line.replace(problemMarker, '').trim(),
        choices: [],
      }
    } else if (choiceMarker.test(line)) {
      mode = 'choice'
      const choice = line.replace(choiceMarker, '').trim()
      if (!currentProblem) {
        throw new Error(
          `Line ${lineNumber}: Found choice marker without an existing problem marker. Did you forget to start the first line with a problem marker ("1.", "2.", etc.)?`
        )
      }
      currentProblem.choices.push(choice)
    } else {
      // no marker detected.
      // if in problem mode, add to problem content
      // if in choice mode, throw error
      switch (mode) {
        case 'problem':
          if (!currentProblem) {
            throw new Error(
              `Line ${lineNumber}: Found problem content without an existing problem marker. Did you forget to start the first line with a problem marker ("1.", "2.", etc.)?`
            )
          }
          currentProblem.content += '\n' + line.trim()
          break
        case 'choice':
          throw new Error(
            `Line ${lineNumber}: Found no choice marker while in choice mode. Did you forget a choice marker ("ก.", "ข.", etc.)?`
          )
      }
    }
  }
  if (currentProblem) {
    if (currentProblem.choices.length > 0) {
      currentProblem.type = 'MCQ'
    } else {
      currentProblem.type = 'SHORT'
    }
    problems.push(currentProblem)
  }
  return problems
}
