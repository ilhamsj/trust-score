export const env = {
  APP_NAME: process.env.APP_NAME || 'Payload',
  APP_SECRET: process.env.APP_SECRET || 'dummies',
  APP_DEBUG: process.env.APP_DEBUG === 'true' || false,
  DATABASE_URI: process.env.DATABASE_URI || 'mongodb://root:root@mongo:27017/trust-score',
  JOBS_DELETE_ON_COMPLETE: process.env.JOBS_DELETE_ON_COMPLETE === 'true' || false,
} as const
