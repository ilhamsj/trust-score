import { betterAuth } from 'better-auth'
import { payloadAdapter } from './adapter'
import { env } from '@/shared/utils'

export const auth = betterAuth({
  baseURL: env.APP_URL,
  secret: env.APP_SECRET,
  database: payloadAdapter(),
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },

  /** if no database is provided, the user data will be stored in memory.
   * Make sure to provide a database to persist user data **/
})
