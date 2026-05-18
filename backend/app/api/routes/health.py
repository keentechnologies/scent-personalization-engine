from fastapi import APIRouter
from sqlalchemy import text

from app.db import engine

router = APIRouter()


@router.get("/health")
def health_check():

    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))

    return {
        "status": "healthy",
        "database": result.scalar()
    }