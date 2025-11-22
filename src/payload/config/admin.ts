import path from 'path'
import { Config } from 'payload'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const adminConfig: Config['admin'] = {
  user: 'users',
  importMap: {
    baseDir: path.resolve(dirname),
  },
}
