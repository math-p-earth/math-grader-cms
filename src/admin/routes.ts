import { AdminRoute } from 'payload/config'

import ProblemsUploadView from './views/ProblemsUpload'
import StudentsRegister from './views/StudentsRegister'

export const adminRoutes: AdminRoute[] = [
  {
    Component: ProblemsUploadView,
    path: '/problems/upload',
  },
  {
    Component: StudentsRegister,
    path: '/students/register',
  },
]
