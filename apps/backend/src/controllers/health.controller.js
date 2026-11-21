import * as healthService from '../services/health.service.js';

export async function getHealth(req, res, next) {
  try {
    const data = await healthService.getOverallHealth();
    res.json({
      success: true,
      message: 'DevFlow backend running',
      data,
    });
  } catch (err) {
    next(err);
  }
}

export async function getDatabaseHealth(req, res, next) {
  try {
    const data = await healthService.getDatabaseHealth();
    const isHealthy = data.status === 'healthy';
    res.status(isHealthy ? 200 : 503).json({
      success: isHealthy,
      message: isHealthy ? 'Database is healthy' : 'Database is unhealthy',
      data,
    });
  } catch (err) {
    next(err);
  }
}

export async function getRedisHealth(req, res, next) {
  try {
    const data = await healthService.getRedisHealth();
    const isHealthy = data.status === 'healthy';
    res.status(isHealthy ? 200 : 503).json({
      success: isHealthy,
      message: isHealthy ? 'Redis is healthy' : 'Redis is unhealthy',
      data,
    });
  } catch (err) {
    next(err);
  }
}

export async function getAiServiceHealth(req, res, next) {
  try {
    const data = await healthService.getAiServiceHealth();
    const isHealthy = data.status === 'healthy';
    res.status(isHealthy ? 200 : 503).json({
      success: isHealthy,
      message: isHealthy ? 'AI service is reachable' : 'AI service is unreachable',
      data,
    });
  } catch (err) {
    next(err);
  }
}
