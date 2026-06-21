from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings
from app.constants.sensitivities import SensitivityKey, SENSITIVITY_DISPLAY_NAMES
from app.models.master_sensitivity_table import MasterSensitivityTable

DATABASE_URL = settings.DATABASE_URL
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

def load_master_sensitivity_table():
    session = SessionLocal()
    try:
        # Delete existing entries to prevent duplication
        session.query(MasterSensitivityTable).delete()
        session.commit()

        records = []
        for key in SensitivityKey:
            name = SENSITIVITY_DISPLAY_NAMES.get(key)
            
            records.append(
                MasterSensitivityTable(
                    key=key.value,
                    name=name,
                    description=f"Master sensitivity issue for {name}"
                )
            )

        session.bulk_save_objects(records)
        session.commit()
        print(f"Successfully loaded {len(records)} sensitivities into master_sensitivity_table")

    except Exception as error:
        session.rollback()
        print("FAILED TO LOAD MASTER SENSITIVITY TABLE", str(error))
    finally:
        session.close()

if __name__ == "__main__":
    load_master_sensitivity_table()
