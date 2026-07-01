from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user
from app.models.user import User
from app.schemas.recommendation_page import (
    RecommendationPageResponse,
    ConfirmSelectionRequest,
    ConfirmSelectionResponse,
)
from app.services.recommendation_page_service import (
    get_recommendation_page_data,
    confirm_cart_selection,
)

router = APIRouter(
    prefix="/recommendation",
    tags=["Recommendation Page"],
)


@router.get(
    "/page-data",
    response_model=RecommendationPageResponse,
)
def get_recommendation_page(
    session_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Returns all 3 recommendation combinations for the given session.
    Reads from final_user_recommendation table (already saved by LLM generation step).
    Frontend reads session_id from localStorage and passes as query param.
    """
    result = get_recommendation_page_data(
        db=db,
        session_id=session_id,
        user_id=current_user.id,
    )

    if not result["success"]:
        raise HTTPException(status_code=404, detail=result["message"])

    return result


@router.post(
    "/confirm",
    response_model=ConfirmSelectionResponse,
)
def confirm_selection(
    payload: ConfirmSelectionRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Called when user clicks 'Go to Cart'.
    Creates pre_cart_items + cart_products for all 3 combos,
    marking selected ones as SELECTED and others as NOT_SELECTED.
    """
    result = confirm_cart_selection(
        db=db,
        session_id=payload.session_id,
        user_id=current_user.id,
        selected_combo_ids=payload.selected_combo_ids,
        qty_updates=payload.qty_updates,
    )

    if not result["success"]:
        raise HTTPException(status_code=400, detail=result["message"])

    return result
