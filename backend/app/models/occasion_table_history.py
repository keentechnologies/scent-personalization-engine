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

    oc_1: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_2: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_3: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_4: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_5: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_6: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_7: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_8: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_9: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_10: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_11: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_12: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_13: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_14: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_15: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_16: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_17: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_18: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_19: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_20: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_21: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_22: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_23: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_24: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_25: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_26: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_27: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_28: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_29: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_30: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_31: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_32: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_33: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_34: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_35: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_36: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_37: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_38: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_39: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_40: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_41: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_42: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_43: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    oc_44: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    created_at: Mapped[TIMESTAMP] = mapped_column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
        nullable=False
    )
