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

from app.schemas.personality_score_table import (
    PersonalityScoreTableSubmitRequest,
    PersonalityScoreTableSubmitResponse,
    PersonalityScoreTableResponse
)

from app.services.personality_score_table_service import (
    submit_personality_stage,
    get_personality_stage
)

router = APIRouter(
    prefix="/quiz/stages/personality",
    tags=["Personality Stage"]
)


@router.post(
    "/submit",
    response_model=PersonalityScoreTableSubmitResponse
)
def submit_personality(
    payload: PersonalityScoreTableSubmitRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    result = submit_personality_stage(
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
    response_model=PersonalityScoreTableResponse
)
def get_personality(
    session_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    result = get_personality_stage(
        db=db,
        current_user=current_user,
        session_id=session_id
    )

    if not result:

        raise HTTPException(
            status_code=404,
            detail="Personality stage not found."
        )

    return result
