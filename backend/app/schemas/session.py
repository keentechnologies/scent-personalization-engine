from uuid import UUID

from pydantic import BaseModel

from app.models.enums import SessionStatus


class SessionResponse(BaseModel):

    id: UUID

    current_stage: str | None

    status: SessionStatus

    class Config:

        from_attributes = True