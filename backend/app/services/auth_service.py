from sqlalchemy.orm import Session

from app.models.user import User
from app.core.security import create_access_token


def get_user_by_phone(
    db: Session,
    phone_number: str
):

    return (
        db.query(User)
        .filter(User.phone_number == phone_number)
        .first()
    )


def create_user(
    db: Session,
    phone_number: str
):

    user = User(
        phone_number=phone_number,
        is_verified=True
    )

    db.add(user)

    db.commit()

    db.refresh(user)

    return user


def authenticate_user(
    db: Session,
    phone_number: str
):

    user = get_user_by_phone(
        db,
        phone_number
    )

    if not user:

        user = create_user(
            db,
            phone_number
        )

    # JWT ACCESS TOKEN CREATED AFTER AUTH
    access_token = create_access_token({
        "sub": str(user.id)
    })

    return {
        "access_token": access_token,
        "user": user
    }