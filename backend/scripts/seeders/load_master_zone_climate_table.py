import pandas as pd

from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


from app.core.config import settings

from app.models.master_zone_table import (
    MasterZoneTable,
)

from app.models.master_zone_climate_table import (
    MasterZoneClimateTable,
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
    BASE_DIR / "master_zone_climate_table.csv"
)


def load_master_zone_climate_table():

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
                "month": "month_number",
                "avg temp": "avg_temperature",
                "avg humidity": "avg_humidity",
                "avg rainfall": "avg_rainfall",
            },
        )

        dataframe = dataframe[[
            "zone_id",
            "month_number",
            "avg_temperature",
            "avg_humidity",
            "avg_rainfall",
        ]]

        session.query(
            MasterZoneClimateTable,
        ).delete()

        session.commit()

        records = []

        for _, row in dataframe.iterrows():

            records.append(
                MasterZoneClimateTable(
                    zone_id=row["zone_id"],
                    month_number=int(
                        row["month_number"]
                    ),
                    avg_temperature=float(
                        row["avg_temperature"]
                    ),
                    avg_humidity=float(
                        row["avg_humidity"]
                    ),
                    avg_rainfall=float(
                        row["avg_rainfall"]
                    ),
                )
            )

        session.bulk_save_objects(records)

        session.commit()

        print(
            f"Successfully loaded {len(records)} climate rows"
        )

    except Exception as error:

        session.rollback()

        print(
            "FAILED TO LOAD MASTER ZONE CLIMATE TABLE",
            str(error),
        )

    finally:

        session.close()


if __name__ == "__main__":

    load_master_zone_climate_table()