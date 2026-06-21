from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings
from app.constants.accords import AccordKey
from app.models.master_gender_table import MasterGenderTable
from app.models.master_accord_table import MasterAccordTable

DATABASE_URL = settings.DATABASE_URL
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

# AccordKey to (unisex, female, male) mapping
GENDER_MAPPINGS = {
    # Unisex Accords
    AccordKey.OCEAN_BREEZE: (1.0, 0.0, 0.0),
    AccordKey.OCEANIC_MIST: (1.0, 0.0, 0.0),
    AccordKey.CITRUS_ELIXIR: (1.0, 0.0, 0.0),
    AccordKey.BERGAMOT_BLUSH: (1.0, 0.0, 0.0),
    AccordKey.NEROLI_BLOOM: (1.0, 0.0, 0.0),
    AccordKey.COFFEE_RUSH: (1.0, 0.0, 0.0),
    
    # Female Accords
    AccordKey.FRANGIPANI: (0.0, 1.0, 0.0),
    AccordKey.ROSE_AND_DEW: (0.0, 1.0, 0.0),
    AccordKey.FLORAL_MIRAGE: (0.0, 1.0, 0.0),
    AccordKey.GARDENIA_DREAM: (0.0, 1.0, 0.0),
    AccordKey.LILY_OF_THE_VALLEY: (0.0, 1.0, 0.0),
    AccordKey.CINNAMON_PINK: (0.0, 1.0, 0.0),
    AccordKey.JASMINE_CLASSIC: (0.0, 1.0, 0.0),
    AccordKey.PEONY_BLUSH: (0.0, 1.0, 0.0),
    AccordKey.VANILLA_DREAM: (0.0, 1.0, 0.0),
    AccordKey.CHOCOLATE_CREME: (0.0, 1.0, 0.0),
    AccordKey.SALTED_CARAMEL: (0.0, 1.0, 0.0),
    AccordKey.ALMOND_MILK: (0.0, 1.0, 0.0),
    
    # Male Accords
    AccordKey.SPICED_WOODS: (0.0, 0.0, 1.0),
    AccordKey.AMBER_PATCHOULI: (0.0, 0.0, 1.0),
    AccordKey.VETIVER: (0.0, 0.0, 1.0),
    AccordKey.EARTHBOUND: (0.0, 0.0, 1.0),
    AccordKey.PEPPER_POUT: (0.0, 0.0, 1.0),
    AccordKey.OMBRE_NOIR: (0.0, 0.0, 1.0),
}

def load_master_gender_table():
    session = SessionLocal()
    try:
        # Delete existing entries to prevent duplication
        session.query(MasterGenderTable).delete()
        session.commit()

        records = []
        for accord_key, (unisex, female, male) in GENDER_MAPPINGS.items():
            records.append(
                MasterGenderTable(
                    accord_key=accord_key.value,  # storing "a1", "a2", etc.
                    unisex_value=unisex,
                    female_value=female,
                    male_value=male
                )
            )

        session.bulk_save_objects(records)
        session.commit()
        print(f"Successfully loaded {len(records)} mappings into master_gender_table")

    except Exception as error:
        session.rollback()
        print("FAILED TO LOAD MASTER GENDER TABLE", str(error))
    finally:
        session.close()

if __name__ == "__main__":
    load_master_gender_table()
