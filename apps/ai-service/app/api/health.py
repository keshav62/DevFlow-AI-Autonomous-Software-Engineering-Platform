from fastapi import APIRouter
from app.database import check_database_health
from app.redis_client import check_redis_health
from app.config import get_settings
import time

router = APIRouter(tags=["health"])


@router.get("/health")
async def health():
    settings = get_settings()
    return {
        "success": True,
        "message": "DevFlow AI service running",
        "data": {
            "service": "fastapi-ai-service",
            "status": "healthy",
            "environment": settings.environment,
            "version": "0.1.0",
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        },
    }


@router.get("/health/database")
async def health_database():
    result = await check_database_health()
    is_healthy = result["status"] == "healthy"
    return {
        "success": is_healthy,
        "message": "Database is healthy" if is_healthy else "Database is unhealthy",
        "data": result,
    }


@router.get("/health/redis")
async def health_redis():
    result = await check_redis_health()
    is_healthy = result["status"] == "healthy"
    return {
        "success": is_healthy,
        "message": "Redis is healthy" if is_healthy else "Redis is unhealthy",
        "data": result,
    }
