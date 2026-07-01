import enum


class SessionStatus(str, enum.Enum):

    ACTIVE = "active"

    COMPLETED = "completed"

    ABANDONED = "abandoned"


class PreCartStatus(str, enum.Enum):

    NOT_SELECTED = "not_selected"

    SELECTED = "selected"

    REMOVED = "removed"

    PURCHASED = "purchased"