import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(5000),
  FRONTEND_URL: z.string().url().default('http://localhost:3000'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  REDIS_URL: z.string().min(1, 'REDIS_URL is required'),
  INTERNAL_AI_SERVICE_URL: z.string().url().default('http://localhost:8000'),
  INTERNAL_SERVICE_SECRET: z.string().min(1, 'INTERNAL_SERVICE_SECRET is required'),
});

export function validateEnv(config) {
  return envSchema.safeParse(config);
}

const parsed = validateEnv(process.env);

if (!parsed.success && process.env.NODE_ENV !== 'test') {
  console.error('Invalid environment configuration:');
  console.error(parsed.error.format());
  process.exit(1);
}

export const env = parsed.success ? parsed.data : {};
