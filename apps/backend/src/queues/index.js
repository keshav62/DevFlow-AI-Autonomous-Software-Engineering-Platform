import { Queue } from 'bullmq';
import { getRedisClient } from '../config/redis.js';
import { logger } from '../config/logger.js';

let workflowQueue = null;

export function getWorkflowQueue() {
  if (!workflowQueue) {
    const connection = getRedisClient();
    workflowQueue = new Queue('devflow-workflows', {
      connection,
      defaultJobOptions: {
        removeOnComplete: { count: 1000 },
        removeOnFail: { count: 5000 },
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
      },
    });

    workflowQueue.on('error', (err) => {
      logger.error({ err: err.message }, 'BullMQ workflow queue error');
    });

    logger.info('BullMQ workflow queue initialized');
  }
  return workflowQueue;
}

export async function enqueueTestJob() {
  const queue = getWorkflowQueue();
  const job = await queue.add(
    'health-check',
    { type: 'health-check', timestamp: new Date().toISOString() },
    { jobId: `health-check-${Date.now()}` }
  );
  logger.info({ jobId: job.id }, 'BullMQ test job enqueued successfully');
  return job.id;
}

export async function closeQueues() {
  if (workflowQueue) {
    await workflowQueue.close();
    workflowQueue = null;
    logger.info('BullMQ workflow queue closed');
  }
}
