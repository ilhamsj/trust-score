import { Users, Media, Articles } from '@/payload/collections'
import { CollectionConfig } from 'payload'

const access: CollectionConfig['access'] = {
  admin: ({ req }) => req.user?.id !== undefined,
  readVersions: ({ req }) => req.user?.id !== undefined,
  unlock: ({ req }) => req.user?.id !== undefined,
  create: () => true,
  read: () => true,
  update: () => true,
  delete: () => true,
}

export const collectionConfig: CollectionConfig[] = [Articles, Media, Users].map<CollectionConfig>(
  (collection) => ({
    ...collection,
    access: {
      ...collection.access,
      ...access,
    },
    ...(['media', 'articles'].includes(collection.slug) && { folders: true }),
    enableQueryPresets: true,
    trash: true,
  }),
)
