from sqlalchemy import ForeignKey, Integer, String, Float
from sqlalchemy.dialects.postgresql import TIMESTAMP
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.models.base import Base

class MasterPerceptionAccordMapping(Base):
    __tablename__ = "master_perception_accord_mapping"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    perception_key: Mapped[str] = mapped_column(
        String,
        ForeignKey("master_perception_table.key", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    accord_key: Mapped[str] = mapped_column(
        String,
        ForeignKey("master_accord_table.key", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    score_level: Mapped[str] = mapped_column(
        String,
        nullable=False,
    )

    score_value: Mapped[float] = mapped_column(
        Float,
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
