from datetime import datetime
from uuid import UUID

from sqlalchemy.orm import Session

from app.models.climate_score_table import (
    ClimateScoreTable,
)
from app.models.master_zone_climate_table import (
    MasterZoneClimateTable,
)
from app.models.pincode_zoneid_mapping_table import (
    PincodeZoneidMappingTable,
)


TEMPERATURE_HOT_THRESHOLD = 30
TEMPERATURE_COLD_THRESHOLD = 20

HUMIDITY_HIGH_THRESHOLD = 75
HUMIDITY_LOW_THRESHOLD = 60

RAINFALL_THRESHOLD = 2.5


class ClimateScoreService:

    def __init__(
        self,
        db: Session,
    ):

        self.db = db

    def generate_climate_profile(
        self,
        session_id: UUID,
        pincode: str,
    ):

        pincode_mapping = (
            self.db.query(
                PincodeZoneidMappingTable
            )
            .filter(
                PincodeZoneidMappingTable.pincode == pincode
            )
            .first()
        )

        if not pincode_mapping:

            raise ValueError(
                "Pincode not found"
            )

        zone_id = pincode_mapping.zone_id

        current_month = datetime.now().month

        months_to_fetch = [
            ((current_month - 1 + offset) % 12) + 1
            for offset in range(3)
        ]

        climate_rows = (
            self.db.query(
                MasterZoneClimateTable
            )
            .filter(
                MasterZoneClimateTable.zone_id == zone_id,
                MasterZoneClimateTable.month_number.in_(
                    months_to_fetch
                ),
            )
            .all()
        )

        if len(climate_rows) != 3:

            raise ValueError(
                "Climate data missing"
            )

        avg_temperature = (
            sum(
                row.avg_temperature
                for row in climate_rows
            ) / 3
        )

        avg_humidity = (
            sum(
                row.avg_humidity
                for row in climate_rows
            ) / 3
        )

        avg_rainfall = (
            sum(
                row.avg_rainfall
                for row in climate_rows
            ) / 3
        )

        temperature_bucket = (
            "H"
            if avg_temperature >= TEMPERATURE_HOT_THRESHOLD
            else "C"
            if avg_temperature < TEMPERATURE_COLD_THRESHOLD
            else "M"
        )

        humidity_bucket = (
            "H"
            if avg_humidity >= HUMIDITY_HIGH_THRESHOLD
            else "L"
            if avg_humidity < HUMIDITY_LOW_THRESHOLD
            else "M"
        )

        rainfall_bucket = (
            "Y"
            if avg_rainfall >= RAINFALL_THRESHOLD
            else "N"
        )

        climate_code = (
            temperature_bucket
            + humidity_bucket
            + rainfall_bucket
        )

        existing_record = (
            self.db.query(
                ClimateScoreTable
            )
            .filter(
                ClimateScoreTable.session_id == session_id
            )
            .first()
        )

        if existing_record:

            existing_record.climate_code = (
                climate_code
            )

        else:

            self.db.add(
                ClimateScoreTable(
                    session_id=session_id,
                    climate_code=climate_code,
                )
            )

        self.db.commit()

        return {
            "climate_code": climate_code,
        }
