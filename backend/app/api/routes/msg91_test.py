from fastapi import APIRouter

from app.services.msg91_service import (
    verify_msg91_access_token
)

router = APIRouter()


@router.get("/msg91-test")
async def msg91_test(access_token: str):

    result = await verify_msg91_access_token(
        access_token
    )

    return result