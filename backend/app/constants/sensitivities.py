import enum

class SensitivityKey(str, enum.Enum):
    MIGRAINE = "s1"
    RESPIRATORY_IRRITATION = "s2"
    SKIN_SENSITIVITY = "s3"
    BODY_ODOUR_AMPLIFICATION = "s4"
    STRONG_INTENSE_SMELLS = "s5"

SENSITIVITY_DISPLAY_NAMES = {
    SensitivityKey.MIGRAINE: "Migraine",
    SensitivityKey.RESPIRATORY_IRRITATION: "Respiratory Irritation",
    SensitivityKey.SKIN_SENSITIVITY: "Skin Sensitivity",
    SensitivityKey.BODY_ODOUR_AMPLIFICATION: "Body Odour Amplification",
    SensitivityKey.STRONG_INTENSE_SMELLS: "Strong / Intense Smells",
}
