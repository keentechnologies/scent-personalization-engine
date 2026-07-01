from uuid6 import uuid7

from sqlalchemy import Boolean, ForeignKey, SmallInteger, Integer, Numeric, Text, String
from sqlalchemy.dialects.postgresql import TIMESTAMP, UUID
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.models.base import Base


class PreCartItem(Base):
    __tablename__ = "pre_cart_items"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid7,
    )

    user_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False,
    )

    session_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("user_sessions.id"),
        nullable=False,
    )

    recommendation_rank: Mapped[int] = mapped_column(
        SmallInteger,
        nullable=False,
    )

    is_default_selected: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
    )

    # Accord 1
    accord_1_id: Mapped[str] = mapped_column(
        String,
        nullable=False,
    )

    accord_1_volume_ml: Mapped[float] = mapped_column(
        Numeric(5, 2),
        nullable=False,
    )

    # Accord 2
    accord_2_id: Mapped[str] = mapped_column(
        String,
        nullable=True,
    )

    accord_2_volume_ml: Mapped[float] = mapped_column(
        Numeric(5, 2),
        nullable=True,
    )

    # Accord 3
    accord_3_id: Mapped[str] = mapped_column(
        String,
        nullable=True,
    )

    accord_3_volume_ml: Mapped[float] = mapped_column(
        Numeric(5, 2),
        nullable=True,
    )

    # Quantity
    quantity: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=1,
    )

    # LLM-provided combination details
    combo_name: Mapped[str] = mapped_column(
        String,
        nullable=False,
    )

    description: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    justification: Mapped[str] = mapped_column(
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
