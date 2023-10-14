import { AdminViewConfig } from 'payload/config'

import ProblemsUploadView from './views/ProblemsUpload'
import StudentsRegister from './views/StudentsRegister'

export const adminViewConfigs: AdminViewConfig[] = [
  {
    Component: ProblemsUploadView,
    path: '/problems/upload',
  },
  {
    Component: StudentsRegister,
    path: '/students/register',
  },
]
