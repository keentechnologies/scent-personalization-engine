from uuid import UUID

from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.core.dependencies import (
    get_db,
    get_current_user
)

from app.models.user import User

from app.schemas.occasion_table import (
    OccasionTableSubmitRequest,
    OccasionTableSubmitResponse,
    OccasionTableResponse
)

from app.services.occasion_table_service import (
    submit_occasion_stage,
    get_occasion_stage
)

router = APIRouter(
    prefix="/quiz/stages/occasion",
    tags=["Occasion Stage"]
)


@router.post(
    "/submit",
    response_model=OccasionTableSubmitResponse
)
def submit_occasion(
    payload: OccasionTableSubmitRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    result = submit_occasion_stage(
        db=db,
        current_user=current_user,
        payload=payload
    )

    if not result["success"]:

        raise HTTPException(
            status_code=400,
            detail=result["message"]
        )

    return result


@router.get(
    "/{session_id}",
    response_model=OccasionTableResponse
)
def get_occasion(
    session_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    result = get_occasion_stage(
        db=db,
        current_user=current_user,
        session_id=session_id
    )

    if not result:

        raise HTTPException(
            status_code=404,
            detail="Occasion stage not found."
        )

    return result
