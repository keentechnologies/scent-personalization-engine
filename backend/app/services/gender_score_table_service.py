from sqlalchemy.orm import Session

from app.models.user_session import UserSession

from app.models.gender_score_table import (
    GenderScoreTable
)

from app.models.gender_score_table_history import (
    GenderScoreTableHistory
)


def submit_gender_stage(
    db: Session,
    current_user,
    payload
):

    session = (
        db.query(UserSession)
        .filter(
            UserSession.id == payload.session_id
        )
        .first()
    )

    if not session:

        return {
            "success": False,
            "message": "Quiz session not found."
        }

    if session.user_id != current_user.id:

        return {
            "success": False,
            "message": "Unauthorized session access."
        }

    valid_scores = [
        0,
        0.5,
        1
    ]

    if (
        payload.masculine_score not in valid_scores
        or payload.feminine_score not in valid_scores
        or payload.unisex_score not in valid_scores
    ):

        return {
            "success": False,
            "message": "Gender scores must be 0, 0.5, or 1."
        }

    gender_row = (
        db.query(GenderScoreTable)
        .filter(
            GenderScoreTable.session_id
            == payload.session_id
        )
        .first()
    )

    if not gender_row:

        gender_row = GenderScoreTable(
            session_id=payload.session_id
        )

        db.add(gender_row)

    gender_row.masculine_score = (
        payload.masculine_score
    )

    gender_row.feminine_score = (
        payload.feminine_score
    )

    gender_row.unisex_score = (
        payload.unisex_score
    )

    history_row = GenderScoreTableHistory(

        session_id=payload.session_id,

        masculine_score=(
            payload.masculine_score
        ),

        feminine_score=(
            payload.feminine_score
        ),

        unisex_score=(
            payload.unisex_score
        )
    )

    db.add(history_row)

    session.current_stage = "gender"

    db.commit()

    return {
        "success": True,
        "message": (
            "Gender stage submitted successfully."
        ),
        "next_stage": "perception"
    }


def get_gender_stage(
    db: Session,
    current_user,
    session_id
):

    session = (
        db.query(UserSession)
        .filter(
            UserSession.id == session_id
        )
        .first()
    )

    if not session:

        return None

    if session.user_id != current_user.id:

        return None

    gender_row = (
        db.query(GenderScoreTable)
        .filter(
            GenderScoreTable.session_id
            == session_id
        )
        .first()
    )

    return gender_row
