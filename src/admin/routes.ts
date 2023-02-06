import { AdminRoute } from 'payload/config'

import ProblemsUploadView from './views/ProblemsUpload'

export const adminRoutes: AdminRoute[] = [
  {
    Component: ProblemsUploadView,
    path: '/problems/upload',
  },
]
