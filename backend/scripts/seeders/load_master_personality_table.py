from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings
from app.constants.personalities import PersonalityKey, PERSONALITY_DISPLAY_NAMES, PERSONALITY_DESCRIPTIONS
from app.models.master_personality_table import MasterPersonalityTable

DATABASE_URL = settings.DATABASE_URL
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

def load_master_personality_table():
    session = SessionLocal()
    try:
        # Delete existing entries to prevent duplication
        session.query(MasterPersonalityTable).delete()
        session.commit()

        records = []
        for key in PersonalityKey:
            name = PERSONALITY_DISPLAY_NAMES.get(key)
            description = PERSONALITY_DESCRIPTIONS.get(key)
            
            records.append(
                MasterPersonalityTable(
                    key=key.value,
                    name=name,
                    description=description
                )
            )

        session.bulk_save_objects(records)
        session.commit()
        print(f"Successfully loaded {len(records)} personalities into master_personality_table")

    except Exception as error:
        session.rollback()
        print("FAILED TO LOAD MASTER PERSONALITY TABLE", str(error))
    finally:
        session.close()

if __name__ == "__main__":
    load_master_personality_table()
