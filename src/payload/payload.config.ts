import { buildConfig } from 'payload'
import {
  collectionConfig,
  adminConfig,
  databaseAdapter,
  graphQLConfig,
  jobsConfig,
  emailConfig,
} from './config'
import { env } from '@/shared/utils/env'
import { fileURLToPath } from 'url'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: adminConfig,
  collections: collectionConfig,
  db: databaseAdapter,
  debug: env.APP_DEBUG,
  email: emailConfig,
  editor: lexicalEditor(),
  graphQL: graphQLConfig,
  jobs: jobsConfig,
  secret: env.APP_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
