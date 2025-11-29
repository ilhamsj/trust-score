export const env = {
  APP_DEBUG: process.env.APP_DEBUG === 'true' || false,
  APP_NAME: process.env.APP_NAME || 'Payload',
  APP_URL: process.env.APP_URL || 'http://localhost:3000',
  APP_SECRET: process.env.APP_SECRET || 'dummies',
  DATABASE_URI: process.env.DATABASE_URI || 'mongodb://root:root@mongo:27017/trust-score?authSource=admin',
  JOBS_DELETE_ON_COMPLETE: process.env.JOBS_DELETE_ON_COMPLETE === 'true' || false,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  DISABLE_LOCAL_STRATEGY: process.env.DISABLE_LOCAL_STRATEGY === 'true' || false,
  // SMTP Configuration - defaults to mailpit (port 1025, STARTTLS, auth)
  // Override for production: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
  SMTP_HOST: process.env.SMTP_HOST || 'mailpit',
  SMTP_PORT: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 1025,
  SMTP_USER: process.env.SMTP_USER || 'root',
  SMTP_PASS: process.env.SMTP_PASS || 'root',
  SMTP_FROM_ADDRESS: process.env.SMTP_FROM_ADDRESS || 'info@payloadcms.com',
  SMTP_FROM_NAME: process.env.SMTP_FROM_NAME || 'Payload',
  SMTP_SECURE: process.env.SMTP_SECURE === 'true' || false,
  SMTP_IGNORE_TLS: process.env.SMTP_IGNORE_TLS === 'true' || false,
} as const
