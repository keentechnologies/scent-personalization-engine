from pydantic import BaseModel


class VerifyMSG91Request(BaseModel):

    access_token: str


class AuthResponse(BaseModel):

    jwt_token: str

    token_type: str = "bearer"

    user_id: str

    phone_number: str