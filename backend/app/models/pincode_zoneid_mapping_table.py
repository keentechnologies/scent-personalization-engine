from sqlalchemy import Double
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.dialects.postgresql import TIMESTAMP
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.sql import func

from app.models.base import Base


class PincodeZoneidMappingTable(Base):

    __tablename__ = "pincode_zoneid_mapping_table"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    pincode: Mapped[str] = mapped_column(
        String(6),
        unique=True,
        nullable=False,
        index=True,
    )

    latitude: Mapped[float] = mapped_column(
        Double,
        nullable=False,
    )

    longitude: Mapped[float] = mapped_column(
        Double,
        nullable=False,
    )

    zone_id: Mapped[str] = mapped_column(
        String,
        ForeignKey(
            "master_zone_table.zone_id"
        ),
        nullable=False,
        index=True,
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