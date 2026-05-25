from sqlalchemy.orm import Session

from app.models.user_session import UserSession

from app.models.personality_score_table import (
    PersonalityScoreTable
)

from app.models.personality_score_table_history import (
    PersonalityScoreTableHistory
)


def submit_personality_stage(
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

    if (
        payload.pr_1 < 0
        or payload.pr_1 > 100
        or payload.pr_2 < 0
        or payload.pr_2 > 100
        or payload.pr_3 < 0
        or payload.pr_3 > 100
        or payload.pr_4 < 0
        or payload.pr_4 > 100
        or payload.pr_5 < 0
        or payload.pr_5 > 100
    ):

        return {
            "success": False,
            "message": (
                "Personality scores must be integers between 0 and 100."
            )
        }

    personality_row = (
        db.query(PersonalityScoreTable)
        .filter(
            PersonalityScoreTable.session_id
            == payload.session_id
        )
        .first()
    )

    if not personality_row:

        personality_row = PersonalityScoreTable(
            session_id=payload.session_id
        )

        db.add(personality_row)

    personality_row.pr_1 = (
        payload.pr_1
    )

    personality_row.pr_2 = (
        payload.pr_2
    )

    personality_row.pr_3 = (
        payload.pr_3
    )

    personality_row.pr_4 = (
        payload.pr_4
    )

    personality_row.pr_5 = (
        payload.pr_5
    )

    history_row = PersonalityScoreTableHistory(

        session_id=payload.session_id,

        pr_1=(
            payload.pr_1
        ),

        pr_2=(
            payload.pr_2
        ),

        pr_3=(
            payload.pr_3
        ),

        pr_4=(
            payload.pr_4
        ),

        pr_5=(
            payload.pr_5
        )
    )

    db.add(history_row)

    session.current_stage = "ocassion"

    db.commit()

    return {
        "success": True,
        "message": (
            "Personality stage submitted successfully."
        ),
        "next_stage": "ocassion"
    }


def get_personality_stage(
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

    personality_row = (
        db.query(PersonalityScoreTable)
        .filter(
            PersonalityScoreTable.session_id
            == session_id
        )
        .first()
    )

    return personality_row
