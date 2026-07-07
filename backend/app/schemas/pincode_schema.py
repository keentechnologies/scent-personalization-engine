from pydantic import BaseModel


class PincodeCheckRequest(BaseModel):

    pincode: str


class PincodeCheckResponse(BaseModel):

    success: bool

    free_delivery: bool


class PincodeLookupResponse(BaseModel):

    pincode: str

    city: str

    state: str

    class Config:

        from_attributes = True