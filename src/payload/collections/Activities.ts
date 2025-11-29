import type { CollectionConfig } from 'payload'

export const Activities: CollectionConfig = {
  slug: 'activities',
  admin: {
    group: 'Audience',
  },
  fields: [
    {
      name: 'contact',
      type: 'relationship',
      relationTo: 'contacts',
      hasMany: true,
    },
    {
      name: 'activityType',
      type: 'select',
      required: true,
      options: ['click', 'open', 'view', 'send', 'receive', 'other'],
    },
  ],
}
