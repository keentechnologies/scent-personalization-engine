from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings
from app.constants.accords import AccordKey
from app.constants.personalities import PersonalityKey
from app.models.master_personality_accord_mapping import MasterPersonalityAccordMapping
from app.models.master_personality_table import MasterPersonalityTable
from app.models.master_accord_table import MasterAccordTable

DATABASE_URL = settings.DATABASE_URL
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

# PersonalityKey to AccordKey mapping
PERSONALITY_ACCORD_MAPPINGS = {
    PersonalityKey.MINIMALIST_PROFESSIONAL: [
        AccordKey.OCEAN_BREEZE,      # a1
        AccordKey.OCEANIC_MIST,      # a2
        AccordKey.CITRUS_ELIXIR,      # a3
        AccordKey.BERGAMOT_BLUSH,     # a4
        AccordKey.VETIVER,            # a14
    ],
    PersonalityKey.POWER_PLAYER: [
        AccordKey.AMBER_PATCHOULI,    # a18
        AccordKey.OMBRE_NOIR,         # a16
        AccordKey.SPICED_WOODS,       # a17
        AccordKey.PEPPER_POUT,        # a19
        AccordKey.EARTHBOUND,         # a15
    ],
    PersonalityKey.ROMANTIC_CHARMER: [
        AccordKey.ROSE_AND_DEW,       # a6
        AccordKey.JASMINE_CLASSIC,    # a7
        AccordKey.PEONY_BLUSH,        # a8
        AccordKey.FRANGIPANI,         # a9
        AccordKey.GARDENIA_DREAM,     # a10
    ],
    PersonalityKey.COMFORT_SEEKER: [
        AccordKey.VANILLA_DREAM,      # a20
        AccordKey.ALMOND_MILK,        # a21
        AccordKey.COFFEE_RUSH,        # a22
        AccordKey.CHOCOLATE_CREME,    # a23
        AccordKey.SALTED_CARAMEL,     # a24
    ],
    PersonalityKey.PLAYFUL_ENERGISER: [
        AccordKey.FLORAL_MIRAGE,      # a12
        AccordKey.CINNAMON_PINK,      # a13
        AccordKey.NEROLI_BLOOM,       # a5
        AccordKey.LILY_OF_THE_VALLEY, # a11
    ]
}

def load_master_personality_accord_mapping():
    session = SessionLocal()
    try:
        # Delete existing entries to prevent duplication
        session.query(MasterPersonalityAccordMapping).delete()
        session.commit()

        records = []
        for personality, accords in PERSONALITY_ACCORD_MAPPINGS.items():
            for accord_key in accords:
                records.append(
                    MasterPersonalityAccordMapping(
                        personality_key=personality.value,  # storing "p1", "p2", etc.
                        accord_key=accord_key.value          # storing "a1", "a2", etc.
                    )
                )

        session.bulk_save_objects(records)
        session.commit()
        print(f"Successfully loaded {len(records)} mappings into master_personality_accord_mapping")

    except Exception as error:
        session.rollback()
        print("FAILED TO LOAD MASTER PERSONALITY ACCORD MAPPING", str(error))
    finally:
        session.close()

if __name__ == "__main__":
    load_master_personality_accord_mapping()
