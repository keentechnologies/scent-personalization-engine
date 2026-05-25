from uuid import UUID

from pydantic import BaseModel


class PersonalityScoreTableSubmitRequest(BaseModel):

    session_id: UUID

    pr_1: int = 0

    pr_2: int = 0

    pr_3: int = 0

    pr_4: int = 0

    pr_5: int = 0


class PersonalityScoreTableSubmitResponse(BaseModel):

    success: bool

    message: str

    next_stage: str | None = None


class PersonalityScoreTableResponse(BaseModel):

    session_id: UUID

    pr_1: int

    pr_2: int

    pr_3: int

    pr_4: int

    pr_5: int

    class Config:

        from_attributes = True
