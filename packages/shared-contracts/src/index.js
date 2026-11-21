/**
 * DevFlow AI – Shared Contracts & Enums
 */

export const ServiceNames = {
  FRONTEND: 'devflow-frontend',
  BACKEND: 'express-backend',
  AI_SERVICE: 'fastapi-ai-service',
  DATABASE: 'postgresql',
  REDIS: 'redis',
};

export const WorkflowStatus = {
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
};

export const MemberRole = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  MEMBER: 'MEMBER',
  VIEWER: 'VIEWER',
};

export const HealthStatus = {
  HEALTHY: 'healthy',
  UNHEALTHY: 'unhealthy',
  DEGRADED: 'degraded',
  UNREACHABLE: 'unreachable',
};

export function formatSuccessResponse(message, data = {}) {
  return {
    success: true,
    message,
    data,
  };
}

export function formatErrorResponse(code, message) {
  return {
    success: false,
    error: {
      code,
      message,
    },
  };
}
