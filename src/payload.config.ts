import { buildConfig } from 'payload/config'

import path from 'path'

import { afterNavLinks } from './admin/components/afterNavLinks'
import ProblemsUploadView from './admin/views/ProblemsUpload'
import { Admins } from './collections/Admins'
import { Courses } from './collections/Courses'
import { ProblemLists } from './collections/ProblemLists'
import { Problems } from './collections/Problems'
import { Sources } from './collections/Sources'
import { Students } from './collections/Students'
import { Submissions } from './collections/Submissions'
import { Tags } from './collections/Tags'
import { Uploads } from './collections/Uploads'

// TODO: validate environment variables
export default buildConfig({
  cors: process.env.CORS_ORIGINS?.split(','),
  admin: {
    user: Admins.slug,
    indexHTML: path.join(__dirname, 'admin/index.html'),
    meta: {
      titleSuffix: "- Math P'Earth",
    },
    components: {
      afterNavLinks: afterNavLinks,
      routes: [
        {
          Component: ProblemsUploadView,
          path: '/problems/upload',
        },
      ],
    },
    // custom webpack config for latex packages
    webpack: (config) => {
      return {
        ...config,
        module: {
          ...config.module,
          rules: [
            ...(config.module?.rules ?? []),
            {
              test: /\.m?js$/,
              resolve: {
                fullySpecified: false,
              },
            },
          ],
        },
      }
    },
  },
  collections: [
    Admins,
    Courses,
    Problems,
    ProblemLists,
    Sources,
    Students,
    Submissions,
    Tags,
    Uploads,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
})
