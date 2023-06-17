import React from 'react'

import './index.scss'

const baseClass = 'problem-number-icon'

export const ProblemNumberIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={baseClass}>{children}</div>
}
