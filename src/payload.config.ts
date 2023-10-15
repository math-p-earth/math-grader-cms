import { buildConfig } from 'payload/config'

import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'

import { afterNavLinks } from './admin/components/afterNavLinks'
import { Providers } from './admin/providers'
import { adminViewConfigs } from './admin/routes'
import { endpoints } from './api/routes'
import { Courses } from './collections/Courses'
import { Media } from './collections/Media'
import { ProblemLists } from './collections/ProblemLists'
import { Problems } from './collections/Problems'
import { Sources } from './collections/Sources'
import { Students } from './collections/Students'
import { Submissions } from './collections/Submissions'
import { Tags } from './collections/Tags'
import { Uploads } from './collections/Uploads'
import { Users } from './collections/Users'
import { CORS_ORIGINS, MONGODB_URI } from './config'

const ignorePaths = [
  path.join(__dirname, 'api/routes/auth/google/verify.ts'),
  path.join(__dirname, 'api/routes/students/register.ts'),
]
const mockPath = path.join(__dirname, 'util/mockObject.ts')
const aliases = ignorePaths.reduce((acc, path) => {
  return {
    ...acc,
    [path]: mockPath,
  }
}, {})

// TODO: validate environment variables
export default buildConfig({
  cors: CORS_ORIGINS,
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: MONGODB_URI,
  }),
  admin: {
    user: Users.slug,
    indexHTML: path.join(__dirname, 'admin/index.html'),
    meta: {
      titleSuffix: "- Math P'Earth",
    },
    components: {
      afterNavLinks: afterNavLinks,
      views: adminViewConfigs.reduce(
        (acc, viewConfig) => ({
          ...acc,
          [viewConfig.path]: viewConfig,
        }),
        {}
      ),
      providers: [Providers],
    },
    bundler: webpackBundler(),
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
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve?.alias,
            ...aliases,
          },
        },
      }
    },
  },
  collections: [
    Courses,
    Media,
    Problems,
    ProblemLists,
    Sources,
    Students,
    Submissions,
    Tags,
    Uploads,
    Users,
  ],
  endpoints: endpoints,
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
})
