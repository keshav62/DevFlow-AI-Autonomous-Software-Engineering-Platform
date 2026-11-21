import { Router } from 'express';
import * as healthController from '../controllers/health.controller.js';

const router = Router();

router.get('/', healthController.getHealth);
router.get('/database', healthController.getDatabaseHealth);
router.get('/redis', healthController.getRedisHealth);
router.get('/ai-service', healthController.getAiServiceHealth);

export default router;
