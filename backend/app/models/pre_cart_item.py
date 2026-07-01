from uuid6 import uuid7

from sqlalchemy import Boolean, Enum, ForeignKey, SmallInteger
from sqlalchemy.dialects.postgresql import TIMESTAMP, UUID
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.models.base import Base
from app.models.enums import PreCartStatus


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

    # FK to cart_products — one-way clean FK, no circular dependency
    product_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("cart_products.id"),
        nullable=False,
    )

    # LLM rank: 1 = top recommendation, 2, 3
    recommendation_rank: Mapped[int] = mapped_column(
        SmallInteger,
        nullable=False,
    )

    # Rank-1 combo is auto-selected by default when shown to user
    is_default_selected: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
    )

    status: Mapped[PreCartStatus] = mapped_column(
        Enum(PreCartStatus),
        nullable=False,
        default=PreCartStatus.NOT_SELECTED,
    )

    # Soft delete — set deleted_at instead of hard deleting
    deleted_at: Mapped[TIMESTAMP] = mapped_column(
        TIMESTAMP(timezone=True),
        nullable=True,
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
