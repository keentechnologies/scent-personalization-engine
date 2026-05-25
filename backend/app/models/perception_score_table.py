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


class PerceptionScoreTable(Base):

    __tablename__ = "perception_score_table"

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

    p_1: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    p_2: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    p_3: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    p_4: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    p_5: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    p_6: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    p_7: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    p_8: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    p_9: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    p_10: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    p_11: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    p_12: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    p_13: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    p_14: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    p_15: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    p_16: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    p_17: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    created_at: Mapped[TIMESTAMP] = mapped_column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
        nullable=False
    )

    updated_at: Mapped[TIMESTAMP] = mapped_column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )
