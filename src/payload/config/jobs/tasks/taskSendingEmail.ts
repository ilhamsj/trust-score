import { TaskConfig } from 'payload'

export const taskSendingEmail: TaskConfig<'taskSendingEmail'> = {
  slug: 'taskSendingEmail',
  inputSchema: [
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'message',
      type: 'text',
      required: true,
    },
  ],
  outputSchema: [
    {
      name: 'message',
      type: 'text',
      required: true,
    },
  ],
  handler: async ({ req }) => {
    const { payload } = req

    payload.logger.info('Sending welcome email')

    return {
      output: {
        message: 'Welcome email sent',
      },
      state: 'succeeded',
    }
  },
}
