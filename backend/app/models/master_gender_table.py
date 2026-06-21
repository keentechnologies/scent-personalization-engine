from sqlalchemy import ForeignKey, Integer, String, Double
from sqlalchemy.dialects.postgresql import TIMESTAMP
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.models.base import Base

class MasterGenderTable(Base):
    __tablename__ = "master_gender_table"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    accord_key: Mapped[str] = mapped_column(
        String,
        ForeignKey("master_accord_table.key", ondelete="CASCADE"),
        unique=True,
        nullable=False,
        index=True,
    )

    unisex_value: Mapped[float] = mapped_column(
        Double,
        default=0.0,
        nullable=False,
    )

    female_value: Mapped[float] = mapped_column(
        Double,
        default=0.0,
        nullable=False,
    )

    male_value: Mapped[float] = mapped_column(
        Double,
        default=0.0,
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
