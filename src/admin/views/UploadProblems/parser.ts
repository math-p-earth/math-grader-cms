interface ProblemInput {
  problemType: "MCQ" | "SHORT" | "TF" | "PROOF" // TODO: rename to "type"
  content: string
  choices?: string[]
  answer: string
}

interface ProblemListInput {
  type: "problem-list"
  config: {
    name: string
    description: string
    type: "DRILL" | "LECTURE_PROBLEM" | "COLLECTION" | "CHALLENGE"
  }
  problems: ProblemInput[]
}

type InputType = "problem-list" | "source"

export function isProblemListInput(source: any): source is ProblemListInput {
  if (!(source?.type === "problem-list")) {
    return false
  }
  if (!(
    typeof source?.config?.name === "string" &&
    typeof source?.config?.description === "string" &&
    typeof source?.config?.type === "string" &&
    ["DRILL", "LECTURE_PROBLEM", "COLLECTION", "CHALLENGE"].includes(source?.config?.type)
  )) {
    return false
  }
  if (!isProblemInputArray(source?.problems)) {
    return false
  }
  return true
}

function isProblemInputArray(problems: any): problems is ProblemInput[] {
  return Array.isArray(problems) && problems.every(isProblemInput)
}

function isProblemInput(source: any): source is ProblemInput {
  if (!(
    typeof source?.problemType === "string" &&
    typeof source?.content === "string" &&
    typeof source?.answer === "string" &&
    ["MCQ", "SHORT", "TF", "PROOF"].includes(source?.problemType)
  )) {
    return false
  }
  if (source?.problemType === "MCQ" && !Array.isArray(source?.choices) && source?.choices.every((choice: any) => typeof choice === "string")) {
    return false
  }
  return true
}

export function isInputType(type: any): type is InputType {
  return ["problem-list", "source"].includes(type)
}