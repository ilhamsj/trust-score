import { env } from '@/shared/utils/env'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { DatabaseAdapterResult } from 'node_modules/payload/dist/database/types'

export const databaseAdapter: DatabaseAdapterResult = mongooseAdapter({
  url: env.DATABASE_URI,
})
