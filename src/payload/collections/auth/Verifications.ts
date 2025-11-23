import type { CollectionConfig } from 'payload'

export const Verifications: CollectionConfig = {
  slug: 'verifications',
  admin: {
    group: 'Authentication',
  },
  fields: [
    {
      name: 'identifier',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'value',
      type: 'json',
      required: true,
    },
    {
      name: 'expiresAt',
      type: 'date',
      required: true,
      index: true,
    },
  ],
}
