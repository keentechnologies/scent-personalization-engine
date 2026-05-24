from app.core.redis import redis_client
from fastapi import APIRouter

router = APIRouter()


@router.get("/redis-test")
def redis_test():

    redis_client.set("test", "working")

    value = redis_client.get("test")

    return {
        "redis": value
    }