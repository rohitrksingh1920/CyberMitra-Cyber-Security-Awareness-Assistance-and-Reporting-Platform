from sqlmodel import SQLModel, Session, create_engine
from app.config import settings

connect_args = {}
if settings.DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

engine = create_engine(
    settings.DATABASE_URL,
    echo=False,
    connect_args=connect_args,
    pool_pre_ping=True,
)


def init_db() -> None:
    """Create tables if they don't exist. For a real production rollout,
    switch to Alembic migrations (scaffold included in /alembic)."""
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
