import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
  },
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
      name: 'title',
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
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
      filterOptions: () => {
        return {
          mimeType: {
            contains: 'image',
          },
        }
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          minDate: new Date(),
        },
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
}
