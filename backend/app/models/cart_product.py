from uuid6 import uuid7

from sqlalchemy import Integer, Numeric, Text, String
from sqlalchemy.dialects.postgresql import TIMESTAMP, UUID
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.models.base import Base


class CartProduct(Base):
    __tablename__ = "cart_products"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid7,
    )

    # Nullable — assigned later when user proceeds to checkout
    order_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        nullable=True,
    )

    # Accord 1 (always required — every combo has at least 2)
    accord_1_id: Mapped[str] = mapped_column(
        String,
        nullable=False,
    )

    accord_1_volume_ml: Mapped[float] = mapped_column(
        Numeric(5, 2),
        nullable=False,
    )

    # Accord 2 (required — minimum combo is 2 accords)
    accord_2_id: Mapped[str] = mapped_column(
        String,
        nullable=True,
    )

    accord_2_volume_ml: Mapped[float] = mapped_column(
        Numeric(5, 2),
        nullable=True,
    )

    # Accord 3 (optional — some combos may have only 2 accords)
    accord_3_id: Mapped[str] = mapped_column(
        String,
        nullable=True,
    )

    accord_3_volume_ml: Mapped[float] = mapped_column(
        Numeric(5, 2),
        nullable=True,
    )

    # User can modify qty at cart stage (default 1)
    quantity: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=1,
    )

    # LLM-provided combo details
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

    # Soft delete — never hard delete for analytics
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
