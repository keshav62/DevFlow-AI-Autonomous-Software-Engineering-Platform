import { logger } from '../config/logger.js';

// Phase 1: Placeholder worker initialization.
// Workers will process background agent tasks in Phase 2+.
// Workers are never executed inside HTTP request handlers.
export function initializeWorkers() {
  logger.info('Worker subsystem initialized (no background workers scheduled in Phase 1)');
}
