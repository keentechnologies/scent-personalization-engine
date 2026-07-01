import json
from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from app.schemas.generate_recommendation import (
    GenerateRecommendationRequest,
    GenerateRecommendationResponse,
)

from app.services.generate_recommendation import (
    generate_recommendation,
)
from sqlalchemy.orm import Session
from app.models.user import User

from app.core.dependencies import (
    get_db,
    get_current_user
)

router = APIRouter(
    prefix="/recommendation",
    tags=["Recommendation Stage"]
)


@router.post(
    "/generate",
    response_model=GenerateRecommendationResponse,
)
def generate_recommendation_route(
    payload: GenerateRecommendationRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    result = generate_recommendation(
        payload=payload,
        db=db,
        current_user=current_user
    )
    
    if not result["success"]:

        raise HTTPException(
            status_code=400,
            detail=result["message"]
        )

    # Try to parse the LLM response as JSON if it is a string
    try:
        if isinstance(result["message"], str):
            result["message"] = json.loads(result["message"])
    except (json.JSONDecodeError, TypeError):
        pass

    return result
