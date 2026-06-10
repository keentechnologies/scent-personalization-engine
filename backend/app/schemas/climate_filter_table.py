from uuid import UUID

from pydantic import BaseModel


class ClimateFilterResponse(BaseModel):

    session_id: UUID
    climate_code: str


class ClimateFilterUpsertResponse(BaseModel):

    success: bool
    climate_code: str
