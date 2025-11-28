import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async (request: Request) => {
  const payload = await getPayload({
    config: configPromise,
  })

  payload.logger.info(Object.keys(request.headers))

  try {
    await payload.sendEmail({
      to: 'test@test.com',
      subject: 'Test',
      text: 'Test',
      html: '<p>Test</p>',
    })
  } catch (error) {
    payload.logger.error(error)
  }

  const items = await payload.find({
    collection: 'users',
  })

  return Response.json(items)
}
