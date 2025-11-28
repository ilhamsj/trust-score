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
      ],
    },
  ],
}
