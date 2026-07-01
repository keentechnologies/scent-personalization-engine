from uuid import UUID
from typing import Optional, Union, Dict, Any

from pydantic import BaseModel


class GenerateRecommendationRequest(BaseModel):

    pincode: str 
    session_id: UUID


class GenerateRecommendationResponse(BaseModel):

    success: bool
    message: Union[str, Dict[str, Any], Any]
