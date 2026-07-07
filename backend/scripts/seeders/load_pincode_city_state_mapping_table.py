import pandas as pd
from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings
from app.models.pincode_city_state_mapping_table import (
    PincodeCityStateMappingTable,
)

DATABASE_URL = settings.DATABASE_URL
engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

BASE_DIR = Path(__file__).resolve().parent
CSV_FILE_PATH = BASE_DIR / "pincode_city_state_mapping_table.csv"


def load_pincode_city_state_mapping_table():
    session = SessionLocal()

    try:
        if not CSV_FILE_PATH.exists():
            print(f"ERROR: CSV file not found at {CSV_FILE_PATH}. Please place the CSV file here to seed the database.")
            return

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
                "city": "city",
                "state": "state",
            },
        )

        dataframe = dataframe[[
            "pincode",
            "city",
            "state",
        ]]

        # Clear existing records to ensure idempotency
        session.query(PincodeCityStateMappingTable).delete()
        session.commit()

        records = []
        for _, row in dataframe.iterrows():
            pincode_str = str(row["pincode"]).strip()
            # Ensure it is zero-padded to 6 digits if it was parsed as a number
            if len(pincode_str) < 6:
                pincode_str = pincode_str.zfill(6)

            records.append(
                PincodeCityStateMappingTable(
                    pincode=pincode_str,
                    city=str(row["city"]).strip(),
                    state=str(row["state"]).strip(),
                )
            )

        session.bulk_save_objects(records)
        session.commit()

        print(
            f"Successfully loaded {len(records)} pincode city/state mappings"
        )

    except Exception as error:
        session.rollback()
        print(
            "FAILED TO LOAD PINCODE CITY/STATE MAPPING TABLE",
            str(error),
        )

    finally:
        session.close()


if __name__ == "__main__":
    load_pincode_city_state_mapping_table()
