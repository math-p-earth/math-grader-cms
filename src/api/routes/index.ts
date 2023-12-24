import { Endpoint } from 'payload/config'

import authGoogleVerifyHandler from './auth/google/verify'
import problemListDownloadHandler from './problem-lists/download'
import problemsUploadHandler from './problems/upload'
import studentsRegister from './students/register'

const authEndpoints: Endpoint[] = [
  {
    path: '/auth/google/verify',
    method: 'post',
    handler: authGoogleVerifyHandler,
  },
  {
    path: '/students/register',
    method: 'post',
    handler: studentsRegister,
  },
]

const problemEndpoints: Endpoint[] = [
  {
    path: '/problems/upload',
    method: 'post',
    handler: problemsUploadHandler,
  },
]

const problemListEndpoints: Endpoint[] = [
  {
    path: '/problem-lists/:problemListId/download',
    method: 'get',
    handler: problemListDownloadHandler,
  },
]

export const endpoints: Endpoint[] = [
  ...authEndpoints,
  ...problemEndpoints,
  ...problemListEndpoints,
]
