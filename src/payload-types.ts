/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    courses: Course;
    media: Media;
    problems: Problem;
    'problem-lists': ProblemList;
    sources: Source;
    students: Student;
    submissions: Submission;
    tags: Tag;
    uploads: Upload;
    users: User;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {};
}
export interface Course {
  id: string;
  name?: string;
  problemLists?: string[] | ProblemList[];
  sources?: string[] | Source[];
  updatedAt: string;
  createdAt: string;
}
export interface ProblemList {
  id: string;
  name: string;
  description?: string;
  type: 'DRILL' | 'LECTURE_PROBLEM' | 'COLLECTION' | 'CHALLENGE';
  problems: string[] | Problem[];
  updatedAt: string;
  createdAt: string;
}
export interface Problem {
  id: string;
  type: 'MCQ' | 'SHORT' | 'TF' | 'PROOF';
  tags?: string[] | Tag[];
  content: string;
  diagrams?: (DiagramImageBlock | DiagramListBlock | DiagramTableBlock)[];
  choices?: {
    choice: string;
    diagrams?: (DiagramImageBlock | DiagramListBlock | DiagramTableBlock)[];
    id?: string;
  }[];
  answer?: string;
  source?: string | Source;
  updatedAt: string;
  createdAt: string;
}
export interface Tag {
  id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
}
export interface DiagramImageBlock {
  image: string | Media;
  caption?: string;
  width?: number;
  height?: number;
  id?: string;
  blockName?: string;
  blockType: 'diagram-image';
}
export interface Media {
  id: string;
  prefix?: string;
  updatedAt: string;
  createdAt: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
}
export interface DiagramListBlock {
  itemsPerLine: number;
  orderScheme:
    | 'unordered:none'
    | 'unordered:bullet'
    | 'ordered:numbers'
    | 'ordered:latex-numbers'
    | 'ordered:letters-lower'
    | 'ordered:letters-upper'
    | 'ordered:latex-letters-lower'
    | 'ordered:latex-letters-upper';
  items: {
    content: string;
    id?: string;
  }[];
  id?: string;
  blockName?: string;
  blockType: 'diagram-list';
}
export interface DiagramTableBlock {
  rows: number;
  columns: number;
  data:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  id?: string;
  blockName?: string;
  blockType: 'diagram-table';
}
export interface Source {
  id: string;
  name: string;
  description?: string;
  type: 'GENERIC' | 'BOOK' | 'PAPER';
  problems?: string[] | Problem[];
  book?: {
    author?: string;
    isbn?: string;
  };
  paper?: {
    timeLimit?: number;
    datePublished?: string;
  };
  updatedAt: string;
  createdAt: string;
}
export interface Student {
  id: string;
  email: string;
  nickname: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | 'RATHER_NOT_SAY';
  firstName: string;
  lastName: string;
  grade: 'M4' | 'M5' | 'M6';
  school: string;
  contact?: {
    phone?: string;
    discord?: string;
    line?: string;
  };
  status: 'PENDING' | 'APPROVED';
  courses?: string[] | Course[];
  googleId: string;
  updatedAt: string;
  createdAt: string;
}
export interface Submission {
  id: string;
  problem: string | Problem;
  student: string | Student;
  status: 'CORRECT_APPROVED' | 'CORRECT' | 'INCORRECT_APPROVED' | 'INCORRECT' | 'PENDING';
  file?: string | Upload;
  score?: number;
  comment?: string;
  updatedAt: string;
  createdAt: string;
}
export interface Upload {
  id: string;
  owner:
    | {
        relationTo: 'users';
        value: string | User;
      }
    | {
        relationTo: 'students';
        value: string | Student;
      };
  updatedAt: string;
  createdAt: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
}
export interface User {
  id: string;
  roles: ('ADMIN' | 'EDITOR')[];
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  salt?: string;
  hash?: string;
  loginAttempts?: number;
  lockUntil?: string;
  password?: string;
}
export interface PayloadPreference {
  id: string;
  user:
    | {
        relationTo: 'students';
        value: string | Student;
      }
    | {
        relationTo: 'users';
        value: string | User;
      };
  key?: string;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
export interface PayloadMigration {
  id: string;
  name?: string;
  batch?: number;
  updatedAt: string;
  createdAt: string;
}


declare module 'payload' {
  export interface GeneratedTypes {
    collections: {
      'courses': Course
      'media': Media
      'problems': Problem
      'problem-lists': ProblemList
      'sources': Source
      'students': Student
      'submissions': Submission
      'tags': Tag
      'uploads': Upload
      'users': User
      'payload-preferences': PayloadPreference
      'payload-migrations': PayloadMigration
    }

  }
}