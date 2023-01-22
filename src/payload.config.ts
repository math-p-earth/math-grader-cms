import { buildConfig } from 'payload/config'

import path from 'path'

import { afterNavLinks } from './admin/components/afterNavLinks'
import UploadProblemsView from './admin/views/UploadProblems'
import { Admins } from './collections/Admins'
import { ProblemLists } from './collections/ProblemLists'
import { Problems } from './collections/Problems'
import { Sources } from './collections/Sources'
import { Students } from './collections/Students'
import { Tags } from './collections/Tags'
import { uploadProblemsHandler } from './routes/upload-problems'

// TODO: validate environment variables
export default buildConfig({
  cors: process.env.CORS_ORIGINS?.split(','),
  admin: {
    user: Admins.slug,
    indexHTML: path.join(__dirname, 'admin/index.html'),
    components: {
      afterNavLinks: afterNavLinks,
      routes: [
        {
          Component: UploadProblemsView,
          path: '/upload-problems',
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
            ...config.module?.rules,
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
  endpoints: [
    {
      method: 'post',
      path: '/upload-problems',
      handler: uploadProblemsHandler,
    },
  ],
  collections: [Admins, Students, Problems, ProblemLists, Sources, Tags],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
})
