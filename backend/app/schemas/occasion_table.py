from uuid import UUID

from pydantic import BaseModel


class OccasionTableSubmitRequest(BaseModel):

    session_id: UUID

    oc_1: bool | None = None

    oc_2: bool | None = None

    oc_3: bool | None = None

    oc_4: bool | None = None

    oc_5: bool | None = None

    oc_6: bool | None = None

    oc_7: bool | None = None

    oc_8: bool | None = None

    oc_9: bool | None = None

    oc_10: bool | None = None

    oc_11: bool | None = None

    oc_12: bool | None = None

    oc_13: bool | None = None

    oc_14: bool | None = None

    oc_15: bool | None = None

    oc_16: bool | None = None

    oc_17: bool | None = None

    oc_18: bool | None = None

    oc_19: bool | None = None

    oc_20: bool | None = None

    oc_21: bool | None = None

    oc_22: bool | None = None

    oc_23: bool | None = None

    oc_24: bool | None = None

    oc_25: bool | None = None

    oc_26: bool | None = None

    oc_27: bool | None = None

    oc_28: bool | None = None

    oc_29: bool | None = None

    oc_30: bool | None = None

    oc_31: bool | None = None

    oc_32: bool | None = None

    oc_33: bool | None = None

    oc_34: bool | None = None

    oc_35: bool | None = None

    oc_36: bool | None = None

    oc_37: bool | None = None

    oc_38: bool | None = None

    oc_39: bool | None = None

    oc_40: bool | None = None

    oc_41: bool | None = None

    oc_42: bool | None = None

    oc_43: bool | None = None

    oc_44: bool | None = None


class OccasionTableSubmitResponse(BaseModel):

    success: bool

    message: str

    next_stage: str | None = None


class OccasionTableResponse(BaseModel):

    session_id: UUID

    oc_1: bool | None

    oc_2: bool | None

    oc_3: bool | None

    oc_4: bool | None

    oc_5: bool | None

    oc_6: bool | None

    oc_7: bool | None

    oc_8: bool | None

    oc_9: bool | None

    oc_10: bool | None

    oc_11: bool | None

    oc_12: bool | None

    oc_13: bool | None

    oc_14: bool | None

    oc_15: bool | None

    oc_16: bool | None

    oc_17: bool | None

    oc_18: bool | None

    oc_19: bool | None

    oc_20: bool | None

    oc_21: bool | None

    oc_22: bool | None

    oc_23: bool | None

    oc_24: bool | None

    oc_25: bool | None

    oc_26: bool | None

    oc_27: bool | None

    oc_28: bool | None

    oc_29: bool | None

    oc_30: bool | None

    oc_31: bool | None

    oc_32: bool | None

    oc_33: bool | None

    oc_34: bool | None

    oc_35: bool | None

    oc_36: bool | None

    oc_37: bool | None

    oc_38: bool | None

    oc_39: bool | None

    oc_40: bool | None

    oc_41: bool | None

    oc_42: bool | None

    oc_43: bool | None

    oc_44: bool | None

    class Config:

        from_attributes = True
