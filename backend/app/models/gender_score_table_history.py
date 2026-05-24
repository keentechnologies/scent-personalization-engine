from uuid6 import uuid7

from sqlalchemy import (
    Float,
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


class GenderScoreTableHistory(Base):

    __tablename__ = "gender_score_table_history"

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

    masculine_score: Mapped[float] = mapped_column(
        Float,
        default=0.5,
        nullable=False
    )

    feminine_score: Mapped[float] = mapped_column(
        Float,
        default=0.5,
        nullable=False
    )

    unisex_score: Mapped[float] = mapped_column(
        Float,
        default=0.5,
        nullable=False
    )

    created_at: Mapped[TIMESTAMP] = mapped_column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
        nullable=False
    )
