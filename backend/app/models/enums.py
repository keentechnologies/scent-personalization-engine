import enum


class SessionStatus(str, enum.Enum):

    ACTIVE = "active"

    COMPLETED = "completed"

    ABANDONED = "abandoned"