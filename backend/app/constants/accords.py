import enum

class AccordKey(str, enum.Enum):
    """
    Standardized unique keys for each of the 24 accords.
    These keys are used in the database and code calculations.
    """
    # Top Notes
    OCEAN_BREEZE = "a1"
    OCEANIC_MIST = "a2"
    CITRUS_ELIXIR = "a3"
    BERGAMOT_BLUSH = "a4"
    NEROLI_BLOOM = "a5"
    
    # Heart Notes
    ROSE_AND_DEW = "a6"
    JASMINE_CLASSIC = "a7"
    PEONY_BLUSH = "a8"
    FRANGIPANI = "a9"
    GARDENIA_DREAM = "a10"
    LILY_OF_THE_VALLEY = "a11"
    FLORAL_MIRAGE = "a12"
    CINNAMON_PINK = "a13"
    
    # Base Notes
    VETIVER = "a14"
    EARTHBOUND = "a15"
    OMBRE_NOIR = "a16"
    SPICED_WOODS = "a17"
    AMBER_PATCHOULI = "a18"
    PEPPER_POUT = "a19"
    VANILLA_DREAM = "a20"
    ALMOND_MILK = "a21"
    COFFEE_RUSH = "a22"
    CHOCOLATE_CREME = "a23"
    SALTED_CARAMEL = "a24"


# User-facing display names mapping
ACCORD_DISPLAY_NAMES = {
    AccordKey.OCEAN_BREEZE: "Ocean Breeze",
    AccordKey.OCEANIC_MIST: "Oceanic Mist",
    AccordKey.CITRUS_ELIXIR: "Citrus Elixir",
    AccordKey.BERGAMOT_BLUSH: "Bergamot Blush",
    AccordKey.NEROLI_BLOOM: "Neroli Bloom",
    AccordKey.ROSE_AND_DEW: "Rose and Dew",
    AccordKey.JASMINE_CLASSIC: "Jasmine Classic",
    AccordKey.PEONY_BLUSH: "Peony Blush",
    AccordKey.FRANGIPANI: "Frangipani",
    AccordKey.GARDENIA_DREAM: "Gardenia Dream",
    AccordKey.LILY_OF_THE_VALLEY: "Lily of the Valley",
    AccordKey.FLORAL_MIRAGE: "Floral Mirage",
    AccordKey.CINNAMON_PINK: "Cinnamon Pink",
    AccordKey.VETIVER: "Vetiver",
    AccordKey.EARTHBOUND: "Earthbound",
    AccordKey.OMBRE_NOIR: "Ombre Noir",
    AccordKey.SPICED_WOODS: "Spiced Woods",
    AccordKey.AMBER_PATCHOULI: "Amber Patchouli",
    AccordKey.PEPPER_POUT: "Pepper Pout",
    AccordKey.VANILLA_DREAM: "Vanilla Dream",
    AccordKey.ALMOND_MILK: "Almond Milk",
    AccordKey.COFFEE_RUSH: "Coffee Rush",
    AccordKey.CHOCOLATE_CREME: "Chocolate Creme",
    AccordKey.SALTED_CARAMEL: "Salted Caramel",
}


# Scent Structure Mapping
ACCORD_NOTE_TYPES = {
    # Tops
    AccordKey.OCEAN_BREEZE: "Top",
    AccordKey.OCEANIC_MIST: "Top",
    AccordKey.CITRUS_ELIXIR: "Top",
    AccordKey.BERGAMOT_BLUSH: "Top",
    AccordKey.NEROLI_BLOOM: "Top",
    
    # Hearts
    AccordKey.ROSE_AND_DEW: "Heart",
    AccordKey.JASMINE_CLASSIC: "Heart",
    AccordKey.PEONY_BLUSH: "Heart",
    AccordKey.FRANGIPANI: "Heart",
    AccordKey.GARDENIA_DREAM: "Heart",
    AccordKey.LILY_OF_THE_VALLEY: "Heart",
    AccordKey.FLORAL_MIRAGE: "Heart",
    AccordKey.CINNAMON_PINK: "Heart",
    
    # Bases
    AccordKey.VETIVER: "Base",
    AccordKey.EARTHBOUND: "Base",
    AccordKey.OMBRE_NOIR: "Base",
    AccordKey.SPICED_WOODS: "Base",
    AccordKey.AMBER_PATCHOULI: "Base",
    AccordKey.PEPPER_POUT: "Base",
    AccordKey.VANILLA_DREAM: "Base",
    AccordKey.ALMOND_MILK: "Base",
    AccordKey.COFFEE_RUSH: "Base",
    AccordKey.CHOCOLATE_CREME: "Base",
    AccordKey.SALTED_CARAMEL: "Base",
}
