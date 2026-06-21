import enum

class PersonalityKey(str, enum.Enum):
    MINIMALIST_PROFESSIONAL = "p1"
    POWER_PLAYER = "p2"
    ROMANTIC_CHARMER = "p3"
    PLAYFUL_ENERGISER = "p4"
    COMFORT_SEEKER = "p5"

PERSONALITY_DISPLAY_NAMES = {
    PersonalityKey.MINIMALIST_PROFESSIONAL: "The Minimalist Professional",
    PersonalityKey.POWER_PLAYER: "The Power Player",
    PersonalityKey.ROMANTIC_CHARMER: "The Romantic Charmer",
    PersonalityKey.PLAYFUL_ENERGISER: "The Playful Energiser",
    PersonalityKey.COMFORT_SEEKER: "The Comfort Seeker",
}

PERSONALITY_DESCRIPTIONS = {
    PersonalityKey.MINIMALIST_PROFESSIONAL: "You like to keep things simple, clean, and put-together. You prefer not to stand out too much but always come across as sharp and well-groomed.",
    PersonalityKey.POWER_PLAYER: "You enjoy making an impact wherever you go. You naturally carry confidence and like being noticed for your strong and commanding presence.",
    PersonalityKey.ROMANTIC_CHARMER: "You are warm, expressive, and enjoy meaningful connections. You like leaving a soft, memorable impression that feels inviting and attractive.",
    PersonalityKey.PLAYFUL_ENERGISER: "You are lively, fun, and bring energy into every room. You enjoy feeling fresh, vibrant, and a little spontaneous in your everyday life.",
    PersonalityKey.COMFORT_SEEKER: "You prefer things that feel familiar, warm, and easy. You like to stay relaxed and enjoy scents that feel cozy and comforting throughout the day.",
}
