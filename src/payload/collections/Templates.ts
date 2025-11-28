import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const Templates: CollectionConfig = {
  slug: 'templates',
  versions: {
    drafts: {
      autosave: true,
      schedulePublish: true,
    },
  },
  admin: {
    preview: (data) => `/template/${data.id}`,
    livePreview: {
      url: ({ data }) => `/template/${data.id}`,
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'from',
      type: 'email',
      required: true,
      admin: {
        placeholder: 'From email address',
      },
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
    },
    {
      name: 'code',
      type: 'code',
      required: true,
      admin: {
        language: 'html',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
      hidden: true,
      defaultValue: ({ user }) => user?.id ?? null,
    },
  ],
}
