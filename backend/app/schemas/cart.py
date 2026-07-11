from typing import Optional
from uuid import UUID
from pydantic import BaseModel


class AccordFormulaItem(BaseModel):
    accord_id: str
    accord_name: str
    volume_ml: float


class CartSelectionItem(BaseModel):
    cart_item_id: Optional[str] = None
    qty: int
    size: str


class CartComboResponseItem(BaseModel):
    pre_cart_item_id: str
    recommendation_rank: int
    is_default_selected: bool
    combo_name: str
    description: str
    justification: str
    formula: list[AccordFormulaItem]
    selections: list[CartSelectionItem]


class CartDataResponse(BaseModel):
    success: bool
    session_id: Optional[str] = None
    combinations: Optional[list[CartComboResponseItem]] = None
    message: Optional[str] = None


class SaveCartSelection(BaseModel):
    size: str
    qty: int


class SaveCartItemRequest(BaseModel):
    pre_cart_item_id: str
    selections: list[SaveCartSelection]


class SaveCartRequest(BaseModel):
    session_id: UUID
    items: list[SaveCartItemRequest]


class LogTraceRequest(BaseModel):
    session_id: UUID
    pre_cart_item_id: Optional[UUID] = None
    combo_name: Optional[str] = None
    action_type: str
    size: Optional[str] = None
    old_qty: Optional[int] = None
    new_qty: Optional[int] = None
