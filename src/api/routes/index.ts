import { Endpoint } from 'payload/config'

import authGoogleVerifyHandler from './auth/google/verify'
import problemsUploadHandler from './problems/upload'

const authEndpoints: Endpoint[] = [
  {
    path: '/auth/google/verify',
    method: 'post',
    handler: authGoogleVerifyHandler,
  },
]

const problemEndpoints: Endpoint[] = [
  {
    path: '/problems/upload',
    method: 'post',
    handler: problemsUploadHandler,
  },
]

export const endpoints: Endpoint[] = [...authEndpoints, ...problemEndpoints]
