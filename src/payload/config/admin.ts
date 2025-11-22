import { Config } from 'payload'
import { env } from '@/shared/env'
import { fileURLToPath } from 'url'
import path from 'path'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const adminConfig: Config['admin'] = {
  user: 'users',
  importMap: {
    baseDir: path.resolve(dirname),
  },
  meta: {
    titleSuffix: `- ${env.APP_NAME}`,
  },
}
