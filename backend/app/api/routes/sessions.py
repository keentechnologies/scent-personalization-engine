from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import (
    get_db,
    get_current_user
)

from app.models.user import User

from app.schemas.session import (
    SessionResponse
)

from app.services.session_service import (
    create_session,
    get_active_session
)

router = APIRouter(
    prefix="/sessions",
    tags=["sessions"]
)


@router.get(
    "/current",
    response_model=SessionResponse | None
)
def current_session(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return get_active_session(
        db,
        current_user.id
    )


@router.post(
    "/start",
    response_model=SessionResponse
)
def start_session(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return create_session(
        db,
        current_user.id
    )