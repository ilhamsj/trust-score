import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { EmailAdapter } from 'payload'
import { env } from '@/shared/utils/env'

export const emailConfig: Promise<EmailAdapter> = nodemailerAdapter({
  defaultFromAddress: env.SMTP_FROM_ADDRESS,
  defaultFromName: env.SMTP_FROM_NAME,
  transportOptions: {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    ...(env.SMTP_HOST === 'mailpit' && {
      secure: false,
      requireTLS: true,
      ignoreTLS: true,
    }),
    ...(env.SMTP_USER &&
      env.SMTP_PASS && {
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASS,
        },
      }),
  },
})
