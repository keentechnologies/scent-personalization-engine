from uuid6 import uuid7
from sqlalchemy import ForeignKey, Text
from sqlalchemy.dialects.postgresql import TIMESTAMP, UUID
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func
from app.models.base import Base

class FinalUserRecommendation(Base):
    __tablename__ = "final_user_recommendation"

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

    recommendations: Mapped[str] = mapped_column(
        Text,
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
