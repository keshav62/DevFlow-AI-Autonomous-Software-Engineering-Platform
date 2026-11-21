import redis.asyncio as aioredis
from app.config import get_settings
import logging
import time

logger = logging.getLogger(__name__)

_redis_client = None


def get_redis_client():
    global _redis_client
    if _redis_client is None:
        settings = get_settings()
        _redis_client = aioredis.from_url(
            settings.redis_url,
            encoding="utf-8",
            decode_responses=True,
        )
    return _redis_client


async def check_redis_health() -> dict:
    start = time.time()
    try:
        client = get_redis_client()
        pong = await client.ping()
        if not pong:
            raise RuntimeError("Redis ping returned falsy response")
        return {
            "service": "redis",
            "status": "healthy",
            "response_time_ms": round((time.time() - start) * 1000, 2),
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        }
    except Exception as e:
        logger.error(f"Redis health check failed: {e}")
        return {
            "service": "redis",
            "status": "unhealthy",
            "error": str(e),
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        }
