

from sqlalchemy import Double
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.dialects.postgresql import TIMESTAMP
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.sql import func

from app.models.base import Base


class MasterZoneClimateTable(Base):

    __tablename__ = "master_zone_climate_table"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    zone_id: Mapped[str] = mapped_column(
        String,
        ForeignKey(
            "master_zone_table.zone_id"
        ),
        nullable=False,
        index=True,
    )

    month_number: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        index=True,
    )

    avg_temperature: Mapped[float] = mapped_column(
        Double,
        nullable=False,
    )

    avg_humidity: Mapped[float] = mapped_column(
        Double,
        nullable=False,
    )

    avg_rainfall: Mapped[float] = mapped_column(
        Double,
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