from typing import Optional, List
from uuid import UUID
from pydantic import BaseModel
from datetime import datetime


# --- Checkout Summary ---
class CheckoutSummaryRequest(BaseModel):
    session_id: UUID
    address_id: UUID


class CheckoutItemDetail(BaseModel):
    pre_cart_item_id: str
    combo_name: str
    size: str
    qty: int
    price: float
    total_price: float


class CheckoutAddressDetail(BaseModel):
    consignee_name: str
    phone_number: str
    secondary_phone_number: Optional[str] = None
    address_type: str
    address_line_1: str
    address_line_2: Optional[str] = None
    city: str
    state: str
    pincode: str


class CheckoutSummaryResponse(BaseModel):
    success: bool
    items: List[CheckoutItemDetail]
    total_items_price: float
    delivery_charge: float
    payable_amount: float
    address: CheckoutAddressDetail


# --- Create Order ---
class CreateOrderRequest(BaseModel):
    session_id: UUID
    address_id: UUID


class CreateOrderResponse(BaseModel):
    success: bool
    order_id: str
    payable_amount: float
    razorpay_order_id: Optional[str] = None
    message: Optional[str] = None


# --- Verify Payment ---
class VerifyPaymentRequest(BaseModel):
    order_id: UUID
    razorpay_payment_id: Optional[str] = None
    razorpay_signature: Optional[str] = None


class VerifyPaymentResponse(BaseModel):
    success: bool
    message: str


# --- Order History ---
class OrderItemHistoryResponse(BaseModel):
    id: UUID
    size: str
    qty: int
    price: float
    combo_name: str
    description: str
    accord_1_id: str
    accord_1_volume_ml: float
    accord_2_id: Optional[str] = None
    accord_2_volume_ml: Optional[float] = None
    accord_3_id: Optional[str] = None
    accord_3_volume_ml: Optional[float] = None


class OrderHistoryResponseItem(BaseModel):
    id: UUID
    created_at: datetime
    status: str
    total_amount: float
    delivery_charge: float
    payable_amount: float
    address: CheckoutAddressDetail
    items: List[OrderItemHistoryResponse]
