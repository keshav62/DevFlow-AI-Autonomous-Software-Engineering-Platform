import { describe, it, expect, vi, beforeAll } from 'vitest';
import supertest from 'supertest';

// Mock config before app loads
vi.mock('../src/config/env.js', () => ({
  env: {
    NODE_ENV: 'test',
    PORT: 5001,
    FRONTEND_URL: 'http://localhost:3000',
    DATABASE_URL: 'postgresql://mock:mock@localhost:5432/mock_db',
    REDIS_URL: 'redis://localhost:6379',
    INTERNAL_AI_SERVICE_URL: 'http://localhost:8000',
    INTERNAL_SERVICE_SECRET: 'test_secret',
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
  enqueueTestJob: vi.fn().mockResolvedValue('test-job-id-123'),
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

describe('Express Backend API Health & Error Tests', () => {
  it('GET /api/v1/health returns 200 with standard response', async () => {
    const res = await supertest(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('DevFlow backend running');
    expect(res.body.data.service).toBe('express-backend');
    expect(res.body.data.status).toBe('healthy');
  });

  it('GET /api/v1/health/database returns 200 when database mock succeeds', async () => {
    const res = await supertest(app).get('/api/v1/health/database');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.service).toBe('postgresql');
    expect(res.body.data.status).toBe('healthy');
  });

  it('GET /api/v1/health/redis returns 200 when redis mock responds with PONG', async () => {
    const res = await supertest(app).get('/api/v1/health/redis');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.service).toBe('redis');
    expect(res.body.data.status).toBe('healthy');
  });

  it('GET /api/v1/invalid-route returns 404 with structured error', async () => {
    const res = await supertest(app).get('/api/v1/invalid-route');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('NOT_FOUND');
    expect(res.body.error.message).toContain('/api/v1/invalid-route not found');
  });

  it('GET /nonexistent returns 404', async () => {
    const res = await supertest(app).get('/nonexistent');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
