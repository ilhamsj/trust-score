import { env } from '@/shared/env'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { DatabaseAdapterResult } from 'node_modules/payload/dist/database/types'

export const databaseAdapter: DatabaseAdapterResult = mongooseAdapter({
  url: env.DATABASE_URI,
})
