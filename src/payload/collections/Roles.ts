import type { CollectionConfig } from 'payload'

export const Roles: CollectionConfig = {
  slug: 'roles',
  admin: {
    group: 'Authentication',
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'permissions',
      type: 'array',
      required: true,
      index: true,
      fields: [
        {
          name: 'collectionName',
          type: 'radio',
          required: true,
          options: ['articles', 'media', 'users', 'accounts', 'sessions', 'verifications'],
        },
        {
          name: 'access',
          type: 'group',
          fields: [
            {
              name: 'create',
              type: 'checkbox',
            },
            {
              name: 'read',
              type: 'checkbox',
            },
            {
              name: 'update',
              type: 'checkbox',
            },
            {
              name: 'destroy',
              type: 'checkbox',
            },
          ],
        },
      ],
    },
  ],
}
