from uuid6 import uuid7
from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import TIMESTAMP, UUID
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.models.base import Base


class CartItem(Base):
    __tablename__ = "cart_items"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid7,
    )

    pre_cart_item_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("pre_cart_items.id", ondelete="CASCADE"),
        nullable=False,
    )

    qty: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=1,
    )

    size: Mapped[str] = mapped_column(
        String,
        ForeignKey("price_configs.size"),
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
