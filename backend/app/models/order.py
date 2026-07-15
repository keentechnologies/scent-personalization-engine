from uuid6 import uuid7
from sqlalchemy import ForeignKey, Numeric, String
from sqlalchemy.dialects.postgresql import TIMESTAMP, UUID
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func
from app.models.base import Base


class Order(Base):
    __tablename__ = "orders"

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

    address_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("addresses.id"),
        nullable=False,
    )

    total_amount: Mapped[float] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    delivery_charge: Mapped[float] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    payable_amount: Mapped[float] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    status: Mapped[str] = mapped_column(
        String,
        nullable=False,
        default="pending_payment",
    )

    razorpay_order_id: Mapped[str] = mapped_column(
        String,
        nullable=True,
    )

    razorpay_payment_id: Mapped[str] = mapped_column(
        String,
        nullable=True,
    )

    razorpay_signature: Mapped[str] = mapped_column(
        String,
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
