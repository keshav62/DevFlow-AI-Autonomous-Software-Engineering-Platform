import { logger } from '../config/logger.js';
import { env } from '../config/env.js';

// eslint-disable-next-line no-unused-vars
export function errorMiddleware(err, req, res, next) {
  const statusCode = err.statusCode ?? err.status ?? 500;
  const isProduction = env.NODE_ENV === 'production';

  logger.error(
    {
      err: err.message,
      stack: isProduction ? undefined : err.stack,
      req: { method: req.method, url: req.url },
    },
    'Handled request error'
  );

  res.status(statusCode).json({
    success: false,
    error: {
      code: err.code ?? (statusCode === 404 ? 'NOT_FOUND' : 'INTERNAL_SERVER_ERROR'),
      message:
        isProduction && statusCode === 500
          ? 'An unexpected error occurred'
          : err.message || 'Something went wrong',
    },
  });
}
