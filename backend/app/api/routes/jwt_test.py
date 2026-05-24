from fastapi import APIRouter

from app.core.security import (
    create_access_token,
    verify_access_token
)

router = APIRouter()


@router.get("/jwt-test")
def jwt_test():

    token = create_access_token({
        "sub": "test-user"
    })

    payload = verify_access_token(token)

    return {
        "token": token,
        "payload": payload
    }