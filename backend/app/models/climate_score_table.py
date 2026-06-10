from uuid6 import uuid7

from sqlalchemy import (
    ForeignKey,
    String,
)

from sqlalchemy.dialects.postgresql import (
    TIMESTAMP,
    UUID,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)

from sqlalchemy.sql import func

from app.models.base import Base


class ClimateScoreTable(Base):

    __tablename__ = "climate_score_table"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid7,
    )

    session_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("user_sessions.id"),
        nullable=False,
        unique=True,
    )

    climate_code: Mapped[str] = mapped_column(
        String(3),
        nullable=False,
    )

    created_at: Mapped[TIMESTAMP] = mapped_column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at: Mapped[TIMESTAMP] = mapped_column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
