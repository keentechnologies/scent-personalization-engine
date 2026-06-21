import enum

class PerceptionKey(str, enum.Enum):
    PROFESSIONAL = "d1"
    APPROACHABLE = "d2"
    CONFIDENT = "d3"
    COMMANDING = "d4"
    EFFORTLESS = "d5"
    REFINED = "d6"
    ELITE = "d7"
    GROUNDED = "d8"
    DEPENDABLE = "d9"
    MATURE = "d10"
    YOUTHFUL = "d11"
    ROMANTIC = "d12"
    MYSTERIOUS = "d13"
    BOLD = "d14"
    EXPRESSIVE = "d15"
    SUBTLE = "d16"
    FRESH = "d17"
    LIGHT = "d18"
    ENERGIZING = "d19"
    RICH = "d20"
    ATTRACTIVE = "d21"
    WARM = "d22"

PERCEPTION_DISPLAY_NAMES = {
    PerceptionKey.PROFESSIONAL: "Professional",
    PerceptionKey.APPROACHABLE: "Approachable",
    PerceptionKey.CONFIDENT: "Confident",
    PerceptionKey.COMMANDING: "Commanding",
    PerceptionKey.EFFORTLESS: "Effortless",
    PerceptionKey.REFINED: "Refined",
    PerceptionKey.ELITE: "Elite",
    PerceptionKey.GROUNDED: "Grounded",
    PerceptionKey.DEPENDABLE: "Dependable",
    PerceptionKey.MATURE: "Mature",
    PerceptionKey.YOUTHFUL: "Youthful",
    PerceptionKey.ROMANTIC: "Romantic",
    PerceptionKey.MYSTERIOUS: "Mysterious",
    PerceptionKey.BOLD: "Bold",
    PerceptionKey.EXPRESSIVE: "Expressive",
    PerceptionKey.SUBTLE: "Subtle",
    PerceptionKey.FRESH: "Fresh",
    PerceptionKey.LIGHT: "Light",
    PerceptionKey.ENERGIZING: "Energizing",
    PerceptionKey.RICH: "Rich",
    PerceptionKey.ATTRACTIVE: "Attractive",
    PerceptionKey.WARM: "Warm",
}
