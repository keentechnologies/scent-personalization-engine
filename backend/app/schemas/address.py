from typing import Optional
from uuid import UUID
from pydantic import BaseModel, Field


class AddressBase(BaseModel):
    consignee_name: str = Field(..., min_length=2, max_length=100)
    phone_number: str = Field(..., pattern=r"^[6-9]\d{9}$")  # Exactly 10 digits starting with 6-9
    secondary_phone_number: Optional[str] = Field(None, pattern=r"^[6-9]\d{9}$|^$")
    address_type: str = Field("home", pattern=r"^(home|work|other)$")
    address_line_1: str = Field(..., min_length=2)
    address_line_2: Optional[str] = None
    city: str = Field(..., min_length=2)
    state: str = Field(..., min_length=2)
    pincode: str = Field(..., pattern=r"^\d{6}$")  # Exactly 6 digits


class AddressCreate(AddressBase):
    pass


class AddressUpdate(AddressBase):
    pass


class AddressResponse(AddressBase):
    id: UUID
    is_default: bool

    class Config:
        from_attributes = True
