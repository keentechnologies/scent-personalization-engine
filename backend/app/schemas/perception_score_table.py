from uuid import UUID

from pydantic import BaseModel


class PerceptionScoreTableSubmitRequest(BaseModel):

    session_id: UUID

    p_1: bool = False

    p_2: bool = False

    p_3: bool = False

    p_4: bool = False

    p_5: bool = False

    p_6: bool = False

    p_7: bool = False

    p_8: bool = False

    p_9: bool = False

    p_10: bool = False

    p_11: bool = False

    p_12: bool = False

    p_13: bool = False

    p_14: bool = False

    p_15: bool = False

    p_16: bool = False

    p_17: bool = False


class PerceptionScoreTableSubmitResponse(BaseModel):

    success: bool

    message: str

    next_stage: str | None = None


class PerceptionScoreTableResponse(BaseModel):

    session_id: UUID

    p_1: bool

    p_2: bool

    p_3: bool

    p_4: bool

    p_5: bool

    p_6: bool

    p_7: bool

    p_8: bool

    p_9: bool

    p_10: bool

    p_11: bool

    p_12: bool

    p_13: bool

    p_14: bool

    p_15: bool

    p_16: bool

    p_17: bool

    class Config:

        from_attributes = True
