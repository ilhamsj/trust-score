import type { CollectionConfig } from 'payload'

export const Accounts: CollectionConfig = {
  slug: 'accounts',
  admin: {
    group: 'Authentication',
  },
  fields: [
    {
      name: 'userId',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
    },
    {
      name: 'accountId',
      type: 'text',
      required: true,
    },
    {
      name: 'providerId',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'accessToken',
      type: 'text',
    },
    {
      name: 'refreshToken',
      type: 'text',
    },
    {
      name: 'accessTokenExpiresAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'refreshTokenExpiresAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'scope',
      type: 'text',
    },
    {
      name: 'idToken',
      type: 'text',
    },
    {
      name: 'password',
      type: 'text',
    },
  ],
}
