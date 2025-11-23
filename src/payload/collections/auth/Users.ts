import { auth, env } from '@/shared/utils'
import { betterAuthStrategy } from './strategies/betterAuthStrategy'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'Authentication',
  },
  auth: {
    ...(env.DISABLE_LOCAL_STRATEGY && { disableLocalStrategy: true }),
    strategies: [betterAuthStrategy],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'email',
      type: 'text',
      index: true,
      unique: true,
    },
    {
      name: 'emailVerified',
      type: 'checkbox',
      defaultValue: false,
      index: true,
    },
    {
      name: 'image',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'relationship',
      relationTo: 'roles',
      hasMany: true,
      index: true,
    },
    {
      name: 'accounts',
      type: 'join',
      on: 'userId',
      collection: 'accounts',
    },
    {
      name: 'sessions',
      type: 'join',
      on: 'userId',
      collection: 'sessions',
    },
  ],
  hooks: {
    afterLogout: [
      async (args) => {
        const payload = args.req.payload
        payload.logger.info({ logout: args.req.user?.email })
        await auth.api.signOut({
          headers: args.req.headers,
        })
      },
    ],
  },
}
