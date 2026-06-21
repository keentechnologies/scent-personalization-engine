from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings
from app.constants.accords import AccordKey, ACCORD_DISPLAY_NAMES, ACCORD_NOTE_TYPES
from app.models.master_accord_table import MasterAccordTable

DATABASE_URL = settings.DATABASE_URL
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

def load_master_accord_table():
    session = SessionLocal()
    try:
        # Delete existing entries to prevent duplication
        session.query(MasterAccordTable).delete()
        session.commit()

        records = []
        for key in AccordKey:
            name = ACCORD_DISPLAY_NAMES.get(key)
            note_type = ACCORD_NOTE_TYPES.get(key)
            
            records.append(
                MasterAccordTable(
                    key=key.value,
                    name=name,
                    note_type=note_type
                )
            )

        session.bulk_save_objects(records)
        session.commit()
        print(f"Successfully loaded {len(records)} accords into master_accord_table")

    except Exception as error:
        session.rollback()
        print("FAILED TO LOAD MASTER ACCORD TABLE", str(error))
    finally:
        session.close()

if __name__ == "__main__":
    load_master_accord_table()
