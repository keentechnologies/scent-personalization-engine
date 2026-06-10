from uuid import UUID
from typing import Optional

from pydantic import BaseModel


class GenerateRecommendationRequest(BaseModel):

    pincode: str 
    session_id: UUID


class GenerateRecommendationResponse(BaseModel):

    success: bool
    message: str
