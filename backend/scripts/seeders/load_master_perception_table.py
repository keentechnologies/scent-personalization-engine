from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings
from app.constants.perception import PerceptionKey, PERCEPTION_DISPLAY_NAMES
from app.models.master_perception_table import MasterPerceptionTable

DATABASE_URL = settings.DATABASE_URL
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

def load_master_perception_table():
    session = SessionLocal()
    try:
        # Delete existing entries to prevent duplication
        session.query(MasterPerceptionTable).delete()
        session.commit()

        records = []
        for key in PerceptionKey:
            name = PERCEPTION_DISPLAY_NAMES.get(key)
            
            records.append(
                MasterPerceptionTable(
                    key=key.value,
                    name=name,
                    description=f"Perception descriptor for {name}"
                )
            )

        session.bulk_save_objects(records)
        session.commit()
        print(f"Successfully loaded {len(records)} perceptions into master_perception_table")

    except Exception as error:
        session.rollback()
        print("FAILED TO LOAD MASTER PERCEPTION TABLE", str(error))
    finally:
        session.close()

if __name__ == "__main__":
    load_master_perception_table()
