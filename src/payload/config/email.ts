import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { EmailAdapter } from 'payload'

export const emailConfig: Promise<EmailAdapter> = nodemailerAdapter({
  defaultFromAddress: 'info@payloadcms.com',
  defaultFromName: 'Payload',
  transportOptions: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
    ...(process.env.SMTP_USER &&
      process.env.SMTP_PASS && {
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      }),
  },
})
