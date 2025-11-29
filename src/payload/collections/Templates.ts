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
      name: 'html',
      type: 'code',
      required: true,
      admin: {
        language: 'html',
        description: 'HTML content of the email template',
      },
    },
    {
      name: 'css',
      type: 'code',
      required: false,
      admin: {
        language: 'css',
        description: 'CSS styles for the email template',
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
  hooks: {
    afterChange: [
      async ({ data, req, operation }) => {
        if (['create', 'update'].includes(operation)) {
          // Combine HTML and CSS for email
          const css = data.css ? `<style>${data.css}</style>` : ''
          const fullHtml = `${css}${data.html || ''}`
          
          await req.payload.sendEmail({
            to: 'test@test.com',
            from: data.from,
            subject: data.subject,
            text: data.html || '',
            html: fullHtml,
          })
        }
      },
    ],
  },
}
