import { Users, Media } from '@/payload/collections'
import { CollectionConfig } from 'payload'

const access: CollectionConfig['access'] = {
  read: () => true,
  create: () => true,
  update: () => true,
  delete: () => true,
}

export const collectionConfig: CollectionConfig[] = [Users, Media].map<CollectionConfig>(
  (collection) => ({
    ...collection,
    access: {
      ...collection.access,
      ...access,
    },
  }),
)
