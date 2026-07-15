from uuid6 import uuid7
from sqlalchemy import ForeignKey, Numeric, String, Integer, Text
from sqlalchemy.dialects.postgresql import TIMESTAMP, UUID
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func
from app.models.base import Base


class OrderItem(Base):
    __tablename__ = "order_items"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid7,
    )

    order_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("orders.id", ondelete="CASCADE"),
        nullable=False,
    )

    size: Mapped[str] = mapped_column(
        String,
        nullable=False,
    )

    qty: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=1,
    )

    price: Mapped[float] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    # --- Scent Formulation Snapshot ---
    combo_name: Mapped[str] = mapped_column(
        String,
        nullable=False,
    )

    description: Mapped[str] = mapped_column(
        Text,
        nullable=False,
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

    created_at: Mapped[TIMESTAMP] = mapped_column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
