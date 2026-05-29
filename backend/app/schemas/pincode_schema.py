from pydantic import BaseModel


class PincodeCheckRequest(BaseModel):

    pincode: str


class PincodeCheckResponse(BaseModel):

    success: bool

    free_delivery: bool