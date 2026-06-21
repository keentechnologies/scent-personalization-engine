from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import TIMESTAMP
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.models.base import Base

class MasterClimateAccordMapping(Base):
    __tablename__ = "master_climate_accord_mapping"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    climate_key: Mapped[str] = mapped_column(
        String,
        ForeignKey("master_climate_table.key", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    accord_key: Mapped[str] = mapped_column(
        String,
        ForeignKey("master_accord_table.key", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    breach_count: Mapped[int] = mapped_column(
        Integer,
        default=0,
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
