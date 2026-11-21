import { describe, it, expect, vi, beforeAll } from 'vitest';
import supertest from 'supertest';

vi.mock('../src/config/env.js', () => ({
  env: {
    NODE_ENV: 'test',
    PORT: 5001,
    FRONTEND_URL: 'http://localhost:3000',
    DATABASE_URL: 'postgresql://mock:mock@localhost:5432/mock_db',
    REDIS_URL: 'redis://localhost:6379',
    INTERNAL_AI_SERVICE_URL: 'http://localhost:8000',
    INTERNAL_SERVICE_SECRET: 'test_secret_integration',
  },
}));

vi.mock('pino-http', () => ({
  default: () => (req, res, next) => next(),
}));

vi.mock('../src/config/logger.js', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  },
}));

vi.mock('../src/config/database.js', () => ({
  prisma: {
    $queryRaw: vi.fn().mockResolvedValue([{ '?column?': 1 }]),
    $connect: vi.fn(),
    $disconnect: vi.fn(),
  },
  connectDatabase: vi.fn(),
  disconnectDatabase: vi.fn(),
}));

vi.mock('../src/config/redis.js', () => ({
  getRedisClient: vi.fn(() => ({
    ping: vi.fn().mockResolvedValue('PONG'),
    on: vi.fn(),
  })),
  connectRedis: vi.fn(),
  disconnectRedis: vi.fn(),
}));

vi.mock('../src/queues/index.js', () => ({
  getWorkflowQueue: vi.fn(),
  enqueueTestJob: vi.fn().mockResolvedValue('job-integration-456'),
  closeQueues: vi.fn(),
}));

vi.mock('../src/workers/index.js', () => ({
  initializeWorkers: vi.fn(),
}));

let app;

beforeAll(async () => {
  const module = await import('../src/app.js');
  app = module.default;
});

describe('DevFlow Multi-Service Integration Contracts', () => {
  it('GET /api/v1/health/ai-service successfully connects to FastAPI AI service', async () => {
    // Mock global fetch for Express to AI Service call
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        data: {
          service: 'fastapi-ai-service',
          status: 'healthy',
        },
      }),
    });

    const res = await supertest(app).get('/api/v1/health/ai-service');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.service).toBe('ai-service');
    expect(res.body.data.status).toBe('healthy');
    expect(res.body.data.upstreamStatus).toBe('healthy');
  });

  it('GET /api/v1/health/ai-service handles upstream unreachable gracefully', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Connection refused'));

    const res = await supertest(app).get('/api/v1/health/ai-service');
    expect(res.status).toBe(503);
    expect(res.body.success).toBe(false);
    expect(res.body.data.status).toBe('unreachable');
  });
});
