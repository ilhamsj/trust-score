import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async (request: Request) => {
  const payload = await getPayload({
    config: configPromise,
  })

  payload.logger.info(Object.keys(request.headers))

  const items = await payload.find({
    collection: 'users',
  })

  return Response.json(items)
}
