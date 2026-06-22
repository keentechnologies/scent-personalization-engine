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


class SensitivityFilter(Base):

    __tablename__ = "sensitivity_filters"

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

    has_migraine_issues: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    has_respiratory_issues: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    has_skin_sensitivity: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    has_strong_smell_discomfort: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
    )

    has_body_odour_concern: Mapped[Optional[bool]] = mapped_column(
        Boolean,
        nullable=True
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