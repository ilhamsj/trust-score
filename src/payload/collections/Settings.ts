import type { CollectionConfig } from 'payload'

export const Settings: CollectionConfig = {
  slug: 'settings',
  admin: {
    group: 'System',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'general',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              unique: true,
            },
          ],
        },
        {
          name: 'smtp',
          fields: [
            {
              name: 'host',
              type: 'text',
              required: true,
            },
            {
              name: 'port',
              type: 'number',
              required: true,
            },
            {
              name: 'username',
              type: 'email',
              required: true,
            },
            {
              name: 'password',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
