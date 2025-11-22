import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import sharp from 'sharp'

import { collectionConfig, adminConfig, databaseAdapter } from './config'
import { env } from '@/shared/env'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: adminConfig,
  collections: collectionConfig,
  db: databaseAdapter,
  editor: lexicalEditor(),
  secret: env.APP_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
