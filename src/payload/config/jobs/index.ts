import { JobsConfig } from 'payload'
import { taskSendingEmail } from './tasks'
import { workflowNewUser } from './workflows'
import { env } from '@/shared/env'

export const jobsConfig: JobsConfig = {
  jobsCollectionOverrides: ({ defaultJobsCollection }) => {
    if (!defaultJobsCollection.admin) {
      defaultJobsCollection.admin = {}
    }

    defaultJobsCollection.admin.hidden = false
    return defaultJobsCollection
  },
  autoRun: [
    {
      cron: '* * * * *',
      limit: 5,
    },
  ],
  tasks: [taskSendingEmail],
  workflows: [workflowNewUser],
  deleteJobOnComplete: env.JOBS_DELETE_ON_COMPLETE,
}
