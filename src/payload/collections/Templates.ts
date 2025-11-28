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
  fields: [
    slugField({
      fieldToUse: 'title',
      overrides: (field) => {
        return {
          ...field,
          unique: true,
        }
      },
    }),
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
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
      defaultValue: ({ user }) => user?.id ?? null,
    },
  ],
}
