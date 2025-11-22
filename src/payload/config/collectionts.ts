import { Users, Media, Articles } from '@/payload/collections'
import { CollectionConfig } from 'payload'

const access: CollectionConfig['access'] = {
  admin: () => true,
  create: () => true,
  delete: () => true,
  read: () => true,
  readVersions: () => true,
  unlock: () => true,
  update: () => true,
}

export const collectionConfig: CollectionConfig[] = [Articles, Media, Users].map<CollectionConfig>(
  (collection) => ({
    ...collection,
    access: {
      ...collection.access,
      ...access,
    },
    enableQueryPresets: true,
    folders: true,
    trash: true,
  }),
)
