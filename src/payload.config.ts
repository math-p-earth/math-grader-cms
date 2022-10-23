import { buildConfig } from 'payload/config'

import path from 'path'

import { Drills } from './collections/Drills'
import { Problems } from './collections/Problems'
import Users from './collections/Users'

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug,
  },
  collections: [Users, Problems, Drills],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
})
