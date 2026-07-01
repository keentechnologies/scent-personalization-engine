from uuid6 import uuid7

from sqlalchemy import String
from sqlalchemy.dialects.postgresql import TIMESTAMP, UUID
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.models.base import Base


class Address(Base):
    __tablename__ = "addresses"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid7,
    )

    consignee_name: Mapped[str] = mapped_column(
        String,
        nullable=False,
    )

    phone_number: Mapped[str] = mapped_column(
        String(15),
        nullable=False,
    )

    secondary_phone_number: Mapped[str] = mapped_column(
        String(15),
        nullable=True,
    )

    address_type: Mapped[str] = mapped_column(
        String,
        nullable=False,
        default="home",  # home, work, other
    )

    address_line_1: Mapped[str] = mapped_column(
        String,
        nullable=False,
    )

    address_line_2: Mapped[str] = mapped_column(
        String,
        nullable=True,
    )

    city: Mapped[str] = mapped_column(
        String,
        nullable=False,
    )

    state: Mapped[str] = mapped_column(
        String,
        nullable=False,
    )

    pincode: Mapped[str] = mapped_column(
        String(10),
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
