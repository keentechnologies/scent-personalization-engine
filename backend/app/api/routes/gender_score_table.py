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

from app.schemas.gender_score_table import (
    GenderScoreTableSubmitRequest,
    GenderScoreTableSubmitResponse,
    GenderScoreTableResponse
)

from app.services.gender_score_table_service import (
    submit_gender_stage,
    get_gender_stage
)

router = APIRouter(
    prefix="/quiz/stages/gender",
    tags=["Gender Stage"]
)


@router.post(
    "/submit",
    response_model=GenderScoreTableSubmitResponse
)
def submit_gender(
    payload: GenderScoreTableSubmitRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    result = submit_gender_stage(
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
    response_model=GenderScoreTableResponse
)
def get_gender(
    session_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    result = get_gender_stage(
        db=db,
        current_user=current_user,
        session_id=session_id
    )

    if not result:

        raise HTTPException(
            status_code=404,
            detail="Gender stage not found."
        )

    return result
