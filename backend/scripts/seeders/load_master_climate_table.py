from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings
from app.constants.climate import ClimateKey, CLIMATE_DISPLAY_NAMES
from app.models.master_climate_table import MasterClimateTable

DATABASE_URL = settings.DATABASE_URL
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

def load_master_climate_table():
    session = SessionLocal()
    try:
        # Delete existing entries to prevent duplication
        session.query(MasterClimateTable).delete()
        session.commit()

        records = []
        for key in ClimateKey:
            name = CLIMATE_DISPLAY_NAMES.get(key)
            
            records.append(
                MasterClimateTable(
                    key=key.value,
                    name=name,
                    description=f"Master climate stage for {name}"
                )
            )

        session.bulk_save_objects(records)
        session.commit()
        print(f"Successfully loaded {len(records)} climates into master_climate_table")

    except Exception as error:
        session.rollback()
        print("FAILED TO LOAD MASTER CLIMATE TABLE", str(error))
    finally:
        session.close()

if __name__ == "__main__":
    load_master_climate_table()
