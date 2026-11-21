from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    port: int = 8000
    environment: str = "development"

    # Database
    database_url: str = "postgresql+asyncpg://devflow:devflow_password@localhost:5432/devflow_db"

    # Redis
    redis_url: str = "redis://localhost:6379"

    # LLM Providers (secured, internal only)
    openai_api_key: str = ""
    gemini_api_key: str = ""

    # Internal microservice authentication secret
    internal_service_secret: str = "devflow_internal_secret_development_phase1"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
