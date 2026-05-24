from uuid import UUID

from pydantic import BaseModel


class GenderScoreTableSubmitRequest(BaseModel):

    session_id: UUID

    masculine_score: float = 0.5

    feminine_score: float = 0.5

    unisex_score: float = 0.5


class GenderScoreTableSubmitResponse(BaseModel):

    success: bool

    message: str

    next_stage: str | None = None


class GenderScoreTableResponse(BaseModel):

    session_id: UUID

    masculine_score: float

    feminine_score: float

    unisex_score: float

    class Config:

        from_attributes = True
