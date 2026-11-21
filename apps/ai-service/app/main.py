from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.api.health import router as health_router
from app.config import get_settings
import logging
import sys

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)],
)
logger = logging.getLogger(__name__)

settings = get_settings()

app = FastAPI(
    title="DevFlow AI Service",
    description="Autonomous Software Engineering Multi-Agent Service",
    version="0.1.0",
    docs_url="/docs" if settings.environment != "production" else None,
    redoc_url="/redoc" if settings.environment != "production" else None,
)

# CORS: strictly limited to internal Express backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "X-Internal-Secret"],
)


@app.middleware("http")
async def internal_auth_middleware(request: Request, call_next):
    # Health checks and documentation routes bypass secret check
    if request.url.path.startswith("/health") or request.url.path in (
        "/docs",
        "/redoc",
        "/openapi.json",
    ):
        return await call_next(request)

    secret = request.headers.get("X-Internal-Secret")
    if secret != settings.internal_service_secret:
        return JSONResponse(
            status_code=401,
            content={
                "success": False,
                "error": {
                    "code": "UNAUTHORIZED",
                    "message": "Invalid or missing internal service secret",
                },
            },
        )
    return await call_next(request)


# Include health routes
app.include_router(health_router)


@app.exception_handler(404)
async def not_found_handler(request: Request, exc):
    return JSONResponse(
        status_code=404,
        content={
            "success": False,
            "error": {
                "code": "NOT_FOUND",
                "message": f"Endpoint {request.method} {request.url.path} not found",
            },
        },
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled service exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": {
                "code": "INTERNAL_SERVER_ERROR",
                "message": "An unexpected error occurred in AI service",
            },
        },
    )


logger.info(f"DevFlow AI service initialized (env={settings.environment})")
