import pytest
from httpx import AsyncClient, ASGITransport
from unittest.mock import patch, AsyncMock
from app.main import app


@pytest.mark.asyncio
async def test_health_endpoint():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as ac:
        response = await ac.get("/health")
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    assert body["data"]["service"] == "fastapi-ai-service"
    assert body["data"]["status"] == "healthy"


@pytest.mark.asyncio
async def test_health_database_healthy():
    with patch(
        "app.api.health.check_database_health", new_callable=AsyncMock
    ) as mock_db:
        mock_db.return_value = {
            "service": "postgresql",
            "status": "healthy",
            "response_time_ms": 1.2,
            "timestamp": "2026-01-01T00:00:00Z",
        }
        async with AsyncClient(
            transport=ASGITransport(app=app), base_url="http://test"
        ) as ac:
            response = await ac.get("/health/database")
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    assert body["data"]["status"] == "healthy"


@pytest.mark.asyncio
async def test_health_redis_healthy():
    with patch(
        "app.api.health.check_redis_health", new_callable=AsyncMock
    ) as mock_redis:
        mock_redis.return_value = {
            "service": "redis",
            "status": "healthy",
            "response_time_ms": 0.5,
            "timestamp": "2026-01-01T00:00:00Z",
        }
        async with AsyncClient(
            transport=ASGITransport(app=app), base_url="http://test"
        ) as ac:
            response = await ac.get("/health/redis")
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    assert body["data"]["status"] == "healthy"


@pytest.mark.asyncio
async def test_unknown_endpoint_returns_404():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as ac:
        response = await ac.get("/nonexistent-endpoint-route")
    assert response.status_code == 404
    body = response.json()
    assert body["success"] is False
    assert body["error"]["code"] == "NOT_FOUND"
