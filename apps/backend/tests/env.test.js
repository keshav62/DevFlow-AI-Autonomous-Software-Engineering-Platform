import { describe, it, expect } from 'vitest';
import { validateEnv } from '../src/config/env.js';

describe('Backend Environment Validation', () => {
  it('validates a complete and valid environment configuration', () => {
    const validConfig = {
      NODE_ENV: 'development',
      PORT: '5000',
      FRONTEND_URL: 'http://localhost:3000',
      DATABASE_URL: 'postgresql://devflow:devflow@localhost:5432/db',
      REDIS_URL: 'redis://localhost:6379',
      INTERNAL_AI_SERVICE_URL: 'http://localhost:8000',
      INTERNAL_SERVICE_SECRET: 'secret123',
    };

    const result = validateEnv(validConfig);
    expect(result.success).toBe(true);
    expect(result.data.PORT).toBe(5000);
  });

  it('rejects configuration when DATABASE_URL is missing', () => {
    const invalidConfig = {
      PORT: '5000',
      FRONTEND_URL: 'http://localhost:3000',
      REDIS_URL: 'redis://localhost:6379',
      INTERNAL_SERVICE_SECRET: 'secret123',
    };

    const result = validateEnv(invalidConfig);
    expect(result.success).toBe(false);
    expect(result.error.issues.some((i) => i.path.includes('DATABASE_URL'))).toBe(true);
  });

  it('rejects configuration when REDIS_URL is missing', () => {
    const invalidConfig = {
      PORT: '5000',
      FRONTEND_URL: 'http://localhost:3000',
      DATABASE_URL: 'postgresql://localhost:5432/db',
      INTERNAL_SERVICE_SECRET: 'secret123',
    };

    const result = validateEnv(invalidConfig);
    expect(result.success).toBe(false);
    expect(result.error.issues.some((i) => i.path.includes('REDIS_URL'))).toBe(true);
  });

  it('rejects configuration when INTERNAL_SERVICE_SECRET is missing', () => {
    const invalidConfig = {
      DATABASE_URL: 'postgresql://localhost:5432/db',
      REDIS_URL: 'redis://localhost:6379',
    };

    const result = validateEnv(invalidConfig);
    expect(result.success).toBe(false);
    expect(result.error.issues.some((i) => i.path.includes('INTERNAL_SERVICE_SECRET'))).toBe(true);
  });
});
