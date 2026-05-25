from uuid6 import uuid7

from sqlalchemy import (
    ForeignKey,
    Integer
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


class PersonalityScoreTableHistory(Base):

    __tablename__ = "personality_score_table_history"

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

    pr_1: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False
    )

    pr_2: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False
    )

    pr_3: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False
    )

    pr_4: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False
    )

    pr_5: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False
    )

    created_at: Mapped[TIMESTAMP] = mapped_column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
        nullable=False
    )
