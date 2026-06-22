from typing import Optional

from uuid6 import uuid7

from sqlalchemy import (
    Boolean,
    ForeignKey
)

from sqlalchemy.dialects.postgresql import (
    TIMESTAMP,
    UUID
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column
)

from sqlalchemy.sql import func

from app.models.base import Base


class OccasionTableHistory(Base):

    __tablename__ = "occasion_table_history"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid7
    )

    session_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("user_sessions.id"),
        nullable=False
    )

    oc_1: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_2: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_3: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_4: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_5: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_6: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_7: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_8: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_9: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_10: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_11: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_12: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_13: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_14: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_15: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_16: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_17: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_18: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_19: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_20: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_21: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_22: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_23: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_24: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_25: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_26: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_27: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_28: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_29: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_30: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_31: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_32: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_33: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_34: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_35: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_36: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_37: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_38: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_39: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_40: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_41: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_42: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_43: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_44: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    created_at: Mapped[TIMESTAMP] = mapped_column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
        nullable=False
    )
