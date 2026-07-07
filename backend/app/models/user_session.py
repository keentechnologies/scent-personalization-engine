from uuid6 import uuid7

from sqlalchemy import Enum, ForeignKey, String
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

from app.models.enums import SessionStatus


class UserSession(Base):

    __tablename__ = "user_sessions"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid7
    )

    user_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False
    )

    current_stage: Mapped[str] = mapped_column(
        String,
        nullable=True
    )

    pincode: Mapped[str | None] = mapped_column(
        String(10),
        nullable=True,
        default=None
    )

    status: Mapped[SessionStatus] = mapped_column(
        Enum(SessionStatus),
        default=SessionStatus.ACTIVE,
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
        nullable=False
    )