from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.models.user import User

from app.schemas.auth import (
    VerifyMSG91Request,
    AuthResponse
)

from app.services.msg91_service import (
    verify_msg91_access_token
)

from app.services.auth_service import (
    authenticate_user
)

from app.core.dependencies import get_db

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)


@router.post(
    "/verify-msg91",
    response_model=AuthResponse
)
async def verify_msg91(
    request: VerifyMSG91Request,
    db: Session = Depends(get_db)
):

    result = await verify_msg91_access_token(
        request.access_token
    )

    if (
        not result
        or result.get("type") != "success"
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid MSG91 token"
        )

    phone_number = f"+{result['message']}"

    auth_result = authenticate_user(
        db,
        phone_number
    )

    return {
        "jwt_token": auth_result["access_token"],
        "user_id": str(auth_result["user"].id),
        "phone_number": auth_result["user"].phone_number,
    }


@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user)
):

    return {
        "user_id": str(current_user.id),
        "phone_number": current_user.phone_number,
        "is_verified": current_user.is_verified
    }