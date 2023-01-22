/* tslint:disable */
/**
 * This file was automatically generated by Payload CMS.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "admins".
 */
export interface Admin {
  id: string
  email?: string
  resetPasswordToken?: string
  resetPasswordExpiration?: string
  loginAttempts?: number
  lockUntil?: string
  createdAt: string
  updatedAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "students".
 */
export interface Student {
  id: string
  nickname: string
  gender: 'MALE' | 'FEMALE' | 'OTHER' | 'RATHER NOT SAY'
  firstName: string
  lastName: string
  grade: 'M4' | 'M5' | 'M6'
  school: string
  contact: {
    phone?: string
    discord?: string
    line?: string
  }
  status: 'PENDING' | 'APPROVED'
  email?: string
  resetPasswordToken?: string
  resetPasswordExpiration?: string
  loginAttempts?: number
  lockUntil?: string
  createdAt: string
  updatedAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "problems".
 */
export interface Problem {
  id: string
  content: string
  type: 'MCQ' | 'SHORT' | 'TF' | 'PROOF'
  choices: {
    choice?: string
    id?: string
  }[]
  answer?: string
  tags?: string[] | Tag[]
  createdAt: string
  updatedAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tags".
 */
export interface Tag {
  id: string
  name?: string
  createdAt: string
  updatedAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "problem-lists".
 */
export interface ProblemList {
  id: string
  name: string
  description?: string
  type?: 'DRILL' | 'LECTURE_PROBLEM' | 'COLLECTION' | 'CHALLENGE'
  problems?: string[] | Problem[]
  createdAt: string
  updatedAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "sources".
 */
export interface Source {
  id: string
  name: string
  description?: string
  type: 'GENERIC' | 'BOOK' | 'PAPER'
  problems?: string[] | Problem[]
  book: {
    author?: string
    isbn?: string
  }
  paper: {
    timeLimit?: number
    datePublished?: string
  }
  createdAt: string
  updatedAt: string
}
