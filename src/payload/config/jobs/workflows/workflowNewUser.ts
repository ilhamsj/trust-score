import { WorkflowConfig } from 'payload'

export const workflowNewUser: WorkflowConfig<'workflowNewUser'> = {
  slug: 'workflowNewUser',
  inputSchema: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
  ],
  schedule: [
    {
      cron: '* * * * *',
      queue: 'default',
    },
  ],
  handler: async ({ req, tasks }) => {
    const { payload } = req

    payload.logger.info('New user workflow started')

    await tasks.taskSendingEmail('taskSendingEmail', {
      input: {
        email: 'test@test.com',
        message: 'Welcome to the platform',
      },
    })

    payload.logger.info('Send welcome email task completed')
  },
}
