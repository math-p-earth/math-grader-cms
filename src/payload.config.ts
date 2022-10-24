import { buildConfig } from 'payload/config'

import path from 'path'

import { Drills } from './collections/Drills'
import { Problems } from './collections/Problems'
import Users from './collections/Users'

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug,
    indexHTML: path.join(__dirname, 'admin/index.html'),
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
  collections: [Users, Problems, Drills],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
})
