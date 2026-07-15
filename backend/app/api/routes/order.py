from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user
from app.models.user import User
from app.schemas.order import (
    CheckoutSummaryResponse,
    CreateOrderRequest,
    CreateOrderResponse,
    VerifyPaymentRequest,
    VerifyPaymentResponse,
    OrderHistoryResponseItem,
)
from app.services.order_service import (
    get_checkout_summary,
    create_order,
    verify_payment,
    get_order_history,
)

router = APIRouter(
    prefix="/orders",
    tags=["Orders and Checkout"],
)


@router.get(
    "/checkout-summary",
    response_model=CheckoutSummaryResponse,
)
async def fetch_checkout_summary(
    session_id: UUID,
    address_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Retrieves pricing, shipping charges, shipping address details, and items summary for checkout.
    """
    res = await get_checkout_summary(
        db=db,
        session_id=session_id,
        user_id=current_user.id,
        address_id=address_id,
    )
    if not res.get("success"):
        raise HTTPException(status_code=400, detail=res.get("message"))
    return res


@router.post(
    "/create",
    response_model=CreateOrderResponse,
)
async def start_order(
    payload: CreateOrderRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Creates an order record in 'pending_payment' state and creates a mock Razorpay order.
    """
    res = await create_order(
        db=db,
        session_id=payload.session_id,
        user_id=current_user.id,
        address_id=payload.address_id,
    )
    if not res.get("success"):
        raise HTTPException(status_code=400, detail=res.get("message"))
    return res


@router.post(
    "/verify-payment",
    response_model=VerifyPaymentResponse,
)
def verify_payment_route(
    payload: VerifyPaymentRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Verifies payment, takes formulation snapshots, clears active cart, and finalizes the order.
    """
    res = verify_payment(
        db=db,
        order_id=payload.order_id,
        user_id=current_user.id,
        razorpay_payment_id=payload.razorpay_payment_id,
        razorpay_signature=payload.razorpay_signature,
    )
    if not res.get("success"):
        raise HTTPException(status_code=400, detail=res.get("message"))
    return res


@router.get(
    "/history",
    response_model=list[OrderHistoryResponseItem],
)
def fetch_order_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Fetches the list of completed custom scent orders for the authenticated user.
    """
    return get_order_history(db=db, user_id=current_user.id)
