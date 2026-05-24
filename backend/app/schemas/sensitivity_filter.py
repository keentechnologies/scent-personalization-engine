from uuid import UUID

from pydantic import BaseModel


class SensitivityFilterSubmitRequest(BaseModel):

    session_id: UUID

    has_migraine_issues: bool

    has_respiratory_issues: bool

    has_skin_sensitivity: bool

    has_strong_smell_discomfort: bool

    has_body_odour_concern: bool


class SensitivityFilterSubmitResponse(BaseModel):

    success: bool

    message: str

    next_stage: str | None = None


class SensitivityFilterResponse(BaseModel):

    session_id: UUID

    has_migraine_issues: bool | None

    has_respiratory_issues: bool | None

    has_skin_sensitivity: bool | None

    has_strong_smell_discomfort: bool | None

    has_body_odour_concern: bool | None

    class Config:

        from_attributes = True