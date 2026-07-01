from uuid6 import uuid7

from sqlalchemy import String, SmallInteger, Integer
from sqlalchemy.dialects.postgresql import TIMESTAMP, UUID, JSONB
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

    # select, unselect, qty_change, checkout_init
    action_type: Mapped[str] = mapped_column(
        String,
        nullable=False,
    )

    recommendation_rank: Mapped[int] = mapped_column(
        SmallInteger,
        nullable=False,
    )

    combo_name: Mapped[str] = mapped_column(
        String,
        nullable=False,
    )

    formula_snapshot: Mapped[dict] = mapped_column(
        JSONB,
        nullable=False,
        default=dict,
    )

    old_quantity: Mapped[int] = mapped_column(
        Integer,
        nullable=True,
    )

    new_quantity: Mapped[int] = mapped_column(
        Integer,
        nullable=True,
    )

    created_at: Mapped[TIMESTAMP] = mapped_column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
