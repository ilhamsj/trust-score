import { auth } from '@/shared/utils'
import type { AuthStrategy, AuthStrategyFunctionArgs } from 'payload'

export const betterAuthStrategy: AuthStrategy = {
  name: 'betterAuth',
  authenticate: async (args: AuthStrategyFunctionArgs) => {
    const session = await auth.api.getSession({
      headers: args.headers,
    })
    if (!session) return { user: null }

    const user = await args.payload.findByID({
      id: session.user.id,
      collection: 'users',
      depth: 1,
    })
    if (!user) return { user: null }

    return {
      user: {
        ...user,
        collection: 'users',
      },
    }
  },
}
