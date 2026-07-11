from uuid6 import uuid7

from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import TIMESTAMP, UUID
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.models.base import Base


class CartActivityTrace(Base):
    __tablename__ = "cart_activity_traces"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid7,
    )

    user_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        nullable=False,
    )

    session_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        nullable=False,
    )

    pre_cart_item_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("pre_cart_items.id", ondelete="CASCADE"),
        nullable=True,
    )

    combo_name: Mapped[str] = mapped_column(
        String,
        nullable=True,
    )

    action_type: Mapped[str] = mapped_column(
        String,
        nullable=False,
    )

    size: Mapped[str] = mapped_column(
        String,
        nullable=True,
    )

    old_qty: Mapped[int] = mapped_column(
        Integer,
        nullable=True,
    )

    new_qty: Mapped[int] = mapped_column(
        Integer,
        nullable=True,
    )

    created_at: Mapped[TIMESTAMP] = mapped_column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
