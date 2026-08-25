"""
Central configuration for the CyberMitra backend.
"""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # App
    APP_NAME: str = "CyberMitra API"
    ENV: str = "development"  # development | production
    API_V1_PREFIX: str = "/api"

    # Database
    DATABASE_URL: str = "postgresql+psycopg2://cybermitra:cybermitra@db:5432/cybermitra"

    # CORS 
    # Comma separated list of allowed origins, e.g. "https://cybermitra.in,https://www.cybermitra.in"
    CORS_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173"

    # Admin 
    # Simple static admin key used to protect admin-only endpoints (view all complaints, etc).
    # Change this in production via the .env file.
    ADMIN_API_KEY: str = "change-this-admin-key"

    # Rate limiting
    RATE_LIMIT_DEFAULT: str = "60/minute"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def cors_origins_list(self) -> list[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]


settings = Settings()
