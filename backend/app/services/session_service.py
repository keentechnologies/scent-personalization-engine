from sqlalchemy.orm import Session

from app.models.user_session import UserSession
from app.models.enums import SessionStatus


def get_active_session(
    db: Session,
    user_id
):

    return (
        db.query(UserSession)
        .filter(
            UserSession.user_id == user_id,
            UserSession.status == SessionStatus.ACTIVE
        )
        .order_by(UserSession.created_at.desc())
        .first()
    )


def create_session(
    db: Session,
    user_id
):

    session = UserSession(
        user_id=user_id,
        current_stage="sensitivity",
        status=SessionStatus.ACTIVE
    )

    db.add(session)

    db.commit()

    db.refresh(session)

    return session