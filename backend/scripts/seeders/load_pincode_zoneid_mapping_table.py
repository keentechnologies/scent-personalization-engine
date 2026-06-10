

import pandas as pd

from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

from app.models.pincode_zoneid_mapping_table import (
    PincodeZoneidMappingTable,
)

from app.models.master_zone_table import (
    MasterZoneTable,
)


DATABASE_URL = settings.DATABASE_URL

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


BASE_DIR = Path(__file__).resolve().parent

CSV_FILE_PATH = (
    BASE_DIR / "pincode_zoneid_mapping_table.csv"
)


def load_pincode_zoneid_mapping_table():

    session = SessionLocal()

    try:

        dataframe = pd.read_csv(
            CSV_FILE_PATH,
            dtype={"pincode": str},
        )

        dataframe.columns = (
            dataframe.columns
            .str.strip()
            .str.lower()
        )

        dataframe = dataframe.rename(
            columns={
                "pincode": "pincode",
                "latitude": "latitude",
                "longitude": "longitude",
                "zone_id": "zone_id",
            },
        )

        dataframe = dataframe[[
            "pincode",
            "latitude",
            "longitude",
            "zone_id",
        ]]

        session.query(
            PincodeZoneidMappingTable,
        ).delete()

        session.commit()

        records = []

        for _, row in dataframe.iterrows():

            records.append(
                PincodeZoneidMappingTable(
                    pincode=str(row["pincode"]),
                    latitude=float(row["latitude"]),
                    longitude=float(row["longitude"]),
                    zone_id=str(row["zone_id"]),
                )
            )

        session.bulk_save_objects(records)

        session.commit()

        print(
            f"Successfully loaded {len(records)} pincode mappings"
        )

    except Exception as error:

        session.rollback()

        print(
            "FAILED TO LOAD PINCODE ZONEID MAPPING TABLE",
            str(error),
        )

    finally:

        session.close()


if __name__ == "__main__":

    load_pincode_zoneid_mapping_table()