import pandas as pd
from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.models.master_zone_table import (
    MasterZoneTable,
)

from app.core.config import settings


DATABASE_URL = settings.DATABASE_URL

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


BASE_DIR = Path(__file__).resolve().parent

CSV_FILE_PATH = (
    BASE_DIR / "master_zone_table.csv"
)


def load_master_zone_table():

    session = SessionLocal()

    try:

        dataframe = pd.read_csv(
            CSV_FILE_PATH,
        )

        dataframe.columns = (
            dataframe.columns
            .str.strip()
            .str.lower()
        )

        dataframe = dataframe.rename(
            columns={
                "zone id": "zone_id",
                "zone": "zone_name",
                "lat": "latitude",
                "long": "longitude",
            },
        )

        dataframe = dataframe[[
            "zone_id",
            "zone_name",
            "latitude",
            "longitude",
        ]]

        dataframe = dataframe.drop_duplicates(
            subset=["zone_name"],
        )

        session.query(
            MasterZoneTable,
        ).delete()

        session.commit()

        records = []

        for _, row in dataframe.iterrows():

            records.append(
                MasterZoneTable(
                    zone_id=row["zone_id"],
                    zone_name=row["zone_name"],
                    latitude=float(row["latitude"]),
                    longitude=float(row["longitude"]),
                )
            )

        session.bulk_save_objects(records)

        session.commit()

        print(
            f"Successfully loaded {len(records)} zones into master_zone_table"
        )

    except Exception as error:

        session.rollback()

        print(
            "FAILED TO LOAD MASTER ZONE TABLE",
            str(error),
        )

    finally:

        session.close()


if __name__ == "__main__":

    load_master_zone_table()