import { Endpoint } from 'payload/config'

import { authGoogleVerifyHandler } from './auth/google/verify'

const authEndpoints: Endpoint[] = [
  {
    path: '/auth/google/verify',
    method: 'post',
    handler: authGoogleVerifyHandler,
  },
]

const endpoints: Endpoint[] = [...authEndpoints]

export default endpoints
