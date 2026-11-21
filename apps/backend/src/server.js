import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { connectRedis, disconnectRedis } from './config/redis.js';
import { getWorkflowQueue, enqueueTestJob, closeQueues } from './queues/index.js';
import { initializeWorkers } from './workers/index.js';
import app from './app.js';

let server;

async function start() {
  try {
    // 1. Verify infrastructure connections
    await connectDatabase();
    await connectRedis();

    // 2. Initialize BullMQ and queue test job
    getWorkflowQueue();
    initializeWorkers();
    await enqueueTestJob();

    // 3. Start HTTP server
    server = app.listen(env.PORT, () => {
      logger.info(`DevFlow Express Backend running on http://localhost:${env.PORT}`);
      logger.info(`Environment: ${env.NODE_ENV}`);
      logger.info(`Health check: http://localhost:${env.PORT}/api/v1/health`);
    });

    server.on('error', (err) => {
      logger.error({ err: err.message }, 'HTTP Server failed to start');
      process.exit(1);
    });
  } catch (err) {
    logger.error({ err: err.message }, 'Fatal error during backend startup');
    process.exit(1);
  }
}

async function shutdown(signal) {
  logger.info(`${signal} received: initiating graceful shutdown...`);

  if (server) {
    server.close(async () => {
      logger.info('HTTP server stopped receiving connections');
      try {
        await closeQueues();
        await disconnectRedis();
        await disconnectDatabase();
        logger.info('All connections cleanly terminated. Exiting.');
        process.exit(0);
      } catch (err) {
        logger.error({ err: err.message }, 'Error encountered during shutdown');
        process.exit(1);
      }
    });

    setTimeout(() => {
      logger.error('Shutdown timeout reached; forcing termination');
      process.exit(1);
    }, 10000);
  } else {
    process.exit(0);
  }
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('uncaughtException', (err) => {
  logger.error({ err: err.message }, 'Uncaught exception');
  process.exit(1);
});
process.on('unhandledRejection', (reason) => {
  logger.error({ reason }, 'Unhandled rejection');
  process.exit(1);
});

start();
