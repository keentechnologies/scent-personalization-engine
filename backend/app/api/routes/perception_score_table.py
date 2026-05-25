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

from app.schemas.perception_score_table import (
    PerceptionScoreTableSubmitRequest,
    PerceptionScoreTableSubmitResponse,
    PerceptionScoreTableResponse
)

from app.services.perception_score_table_service import (
    submit_perception_stage,
    get_perception_stage
)

router = APIRouter(
    prefix="/quiz/stages/perception",
    tags=["Perception Stage"]
)


@router.post(
    "/submit",
    response_model=PerceptionScoreTableSubmitResponse
)
def submit_perception(
    payload: PerceptionScoreTableSubmitRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    result = submit_perception_stage(
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
    response_model=PerceptionScoreTableResponse
)
def get_perception(
    session_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    result = get_perception_stage(
        db=db,
        current_user=current_user,
        session_id=session_id
    )

    if not result:

        raise HTTPException(
            status_code=404,
            detail="Perception stage not found."
        )

    return result
