export const env = {
  APP_NAME: process.env.APP_NAME || 'Payload',
  APP_SECRET: process.env.APP_SECRET || 'dummies',
  DATABASE_URI: process.env.DATABASE_URI || 'mongodb://root:root@mongo:27017/trust-score',
} as const
