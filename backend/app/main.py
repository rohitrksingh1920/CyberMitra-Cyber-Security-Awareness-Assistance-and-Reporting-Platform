from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from app.config import settings
from app.database import init_db
from app.limiter import limiter
from app.routers import complaints, suspects, misc


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(
    title=settings.APP_NAME,
    description="Backend API for CyberMitra — Cyber Security Awareness, Assistance and Reporting Platform.",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(complaints.router, prefix=settings.API_V1_PREFIX)
app.include_router(suspects.router, prefix=settings.API_V1_PREFIX)
app.include_router(misc.router, prefix=settings.API_V1_PREFIX)


@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": settings.APP_NAME, "env": settings.ENV}


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    # Avoid leaking internals in production while still returning a clean JSON error.
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error. Please try again shortly."},
    )
