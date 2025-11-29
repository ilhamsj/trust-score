import type { CollectionConfig } from 'payload'

export const Segments: CollectionConfig = {
  slug: 'segments',
  admin: {
    group: 'Audience',
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}
