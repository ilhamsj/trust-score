import type { CollectionConfig } from 'payload'

export const Contacts: CollectionConfig = {
  slug: 'contacts',
  admin: {
    group: 'Audience',
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'phone',
      type: 'text',
      index: true,
    },
    {
      name: 'address',
      type: 'text',
      index: true,
    },
    {
      name: 'mergeFields',
      type: 'array',
      fields: [
        {
          name: 'mergeField',
          type: 'relationship',
          relationTo: 'properties',
        },
        {
          name: 'value',
          type: 'text',
        },
      ],
    },
    {
      name: 'segments',
      type: 'relationship',
      relationTo: 'segments',
      hasMany: true,
    },
  ],
}
