from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user
from app.models.user import User
from app.schemas.cart import CartDataResponse, SaveCartRequest, LogTraceRequest
from app.services.cart_service import (
    get_cart_data,
    save_cart_selection,
    log_cart_activity_trace,
)

router = APIRouter(
    prefix="/cart",
    tags=["Cart Operations"],
)


@router.get(
    "",
    response_model=CartDataResponse,
)
def get_cart(
    session_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Returns the 3 recommendation combinations (pre_cart_items) generated for the session,
    along with any active cart selections (sizes & quantities) from cart_items.
    """
    result = get_cart_data(
        db=db,
        session_id=session_id,
        user_id=current_user.id,
    )

    if not result["success"]:
        raise HTTPException(status_code=404, detail=result["message"])

    return result


@router.post(
    "/save",
)
def save_cart(
    payload: SaveCartRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Bulk updates the selections in the cart_items table for the current session.
    Fired when the user clicks 'Continue to Shipping'.
    """
    items_list = []
    for item in payload.items:
        selections_list = []
        for sel in item.selections:
            selections_list.append({
                "size": sel.size,
                "qty": sel.qty
            })
        items_list.append({
            "pre_cart_item_id": item.pre_cart_item_id,
            "selections": selections_list
        })

    result = save_cart_selection(
        db=db,
        session_id=payload.session_id,
        user_id=current_user.id,
        payload_items=items_list,
    )

    if not result["success"]:
        raise HTTPException(status_code=400, detail=result["message"])

    return result


@router.post(
    "/trace",
)
def trace_cart(
    payload: LogTraceRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Logs a single cart action in the cart_activity_traces table.
    Called in real-time on every frontend selection/qty toggle.
    """
    result = log_cart_activity_trace(
        db=db,
        session_id=payload.session_id,
        user_id=current_user.id,
        pre_cart_item_id=payload.pre_cart_item_id,
        combo_name=payload.combo_name,
        action_type=payload.action_type,
        size=payload.size,
        old_qty=payload.old_qty,
        new_qty=payload.new_qty,
    )

    if not result["success"]:
        raise HTTPException(status_code=400, detail=result["message"])

    return result
