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

from app.schemas.sensitivity_filter import (
    SensitivityFilterSubmitRequest,
    SensitivityFilterSubmitResponse,
    SensitivityFilterResponse
)

from app.services.sensitivity_filter_service import (
    submit_sensitivity_stage,
    get_sensitivity_stage
)

router = APIRouter(
    prefix="/quiz/stages/sensitivity",
    tags=["Sensitivity Stage"]
)


@router.post(
    "/submit",
    response_model=SensitivityFilterSubmitResponse
)
def submit_sensitivity(
    payload: SensitivityFilterSubmitRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    result = submit_sensitivity_stage(
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
    response_model=SensitivityFilterResponse
)
def get_sensitivity(
    session_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    result = get_sensitivity_stage(
        db=db,
        current_user=current_user,
        session_id=session_id
    )

    if not result:

        raise HTTPException(
            status_code=404,
            detail="Sensitivity stage not found."
        )

    return result