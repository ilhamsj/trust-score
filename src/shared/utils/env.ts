export const env = {
  APP_DEBUG: process.env.APP_DEBUG === 'true' || false,
  APP_NAME: process.env.APP_NAME || 'Payload',
  APP_URL: process.env.APP_URL || 'http://localhost:3000',
  APP_SECRET: process.env.APP_SECRET || 'dummies',
  DATABASE_URI: process.env.DATABASE_URI || 'mongodb://root:root@mongo:27017/trust-score',
  JOBS_DELETE_ON_COMPLETE: process.env.JOBS_DELETE_ON_COMPLETE === 'true' || false,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  DISABLE_LOCAL_STRATEGY: true,
} as const
