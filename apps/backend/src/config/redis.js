import { Redis } from 'ioredis';
import { env } from './env.js';
import { logger } from './logger.js';

let redisClient = null;

export function getRedisClient() {
  if (!redisClient) {
    redisClient = new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
      lazyConnect: true,
      retryStrategy(times) {
        if (times > 5) {
          logger.error('Redis retry limit exhausted');
          return null;
        }
        return Math.min(times * 500, 3000);
      },
    });

    redisClient.on('connect', () => logger.info('Redis socket connected'));
    redisClient.on('error', (err) => logger.error({ err: err.message }, 'Redis error'));
    redisClient.on('close', () => logger.warn('Redis connection closed'));
  }
  return redisClient;
}

export async function connectRedis() {
  const client = getRedisClient();
  try {
    await client.connect();
    logger.info('Redis connection verified and ready');
  } catch (error) {
    logger.error({ err: error.message }, 'Failed to connect to Redis');
    throw error;
  }
}

export async function disconnectRedis() {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
    logger.info('Redis disconnected cleanly');
  }
}
