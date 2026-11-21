import { prisma } from '../config/database.js';
import { getRedisClient } from '../config/redis.js';
import { env } from '../config/env.js';

export async function getOverallHealth() {
  return {
    service: 'express-backend',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
    version: '0.1.0',
  };
}

export async function getDatabaseHealth() {
  const start = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    return {
      service: 'postgresql',
      status: 'healthy',
      responseTimeMs: Date.now() - start,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      service: 'postgresql',
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
}

export async function getRedisHealth() {
  const start = Date.now();
  try {
    const client = getRedisClient();
    const pong = await client.ping();
    if (pong !== 'PONG') {
      throw new Error(`Unexpected PING response: ${pong}`);
    }
    return {
      service: 'redis',
      status: 'healthy',
      responseTimeMs: Date.now() - start,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      service: 'redis',
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
}

export async function getAiServiceHealth() {
  const start = Date.now();
  try {
    const response = await fetch(`${env.INTERNAL_AI_SERVICE_URL}/health`, {
      headers: {
        'X-Internal-Secret': env.INTERNAL_SERVICE_SECRET,
      },
      signal: AbortSignal.timeout(5000),
    });
    const data = await response.json();
    return {
      service: 'ai-service',
      status: response.ok ? 'healthy' : 'unhealthy',
      responseTimeMs: Date.now() - start,
      upstreamStatus: data?.data?.status ?? 'unknown',
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      service: 'ai-service',
      status: 'unreachable',
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
}
