import { buildConfig } from 'payload/config'

import path from 'path'

import { ProblemLists } from './collections/ProblemLists'
import { Problems } from './collections/Problems'
import { Sources } from './collections/Sources'
import { Tags } from './collections/Tags'
import { Users } from './collections/Users'
import { afterNavLinks } from './admin/components/afterNavLinks'
import UploadProblemsView from './admin/views/UploadProblems'
import { uploadProblemsHandler } from './routes/upload-problems'

export default buildConfig({
  // Disabled until we have a static IP or domain name
  // serverURL: 'http://localhost:3000',

  // TODO: Change this to real domain
  cors: '*',
  admin: {
    user: Users.slug,
    indexHTML: path.join(__dirname, 'admin/index.html'),
    components: {
      afterNavLinks: afterNavLinks,
      routes: [
        {
          Component: UploadProblemsView,
          path: "/upload-problems"
        }
      ]
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
    }
  ],
  collections: [Users, Problems, ProblemLists, Sources, Tags],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
})
