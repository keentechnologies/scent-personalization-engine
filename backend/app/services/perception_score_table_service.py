from sqlalchemy.orm import Session

from app.models.user_session import UserSession

from app.models.perception_score_table import (
    PerceptionScoreTable
)

from app.models.perception_score_table_history import (
    PerceptionScoreTableHistory
)


def submit_perception_stage(
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

    selected_count = sum([
        payload.p_1,
        payload.p_2,
        payload.p_3,
        payload.p_4,
        payload.p_5,
        payload.p_6,
        payload.p_7,
        payload.p_8,
        payload.p_9,
        payload.p_10,
        payload.p_11,
        payload.p_12,
        payload.p_13,
        payload.p_14,
        payload.p_15,
        payload.p_16,
        payload.p_17,
        payload.p_18,
        payload.p_19,
        payload.p_20,
        payload.p_21,
        payload.p_22
    ])

    if selected_count < 5:

        return {
            "success": False,
            "message": (
                "Please select at least 5 descriptors before continuing."
            )
        }

    perception_row = (
        db.query(PerceptionScoreTable)
        .filter(
            PerceptionScoreTable.session_id
            == payload.session_id
        )
        .first()
    )

    if not perception_row:

        perception_row = PerceptionScoreTable(
            session_id=payload.session_id
        )

        db.add(perception_row)

    perception_row.p_1 = (
        payload.p_1
    )

    perception_row.p_2 = (
        payload.p_2
    )

    perception_row.p_3 = (
        payload.p_3
    )

    perception_row.p_4 = (
        payload.p_4
    )

    perception_row.p_5 = (
        payload.p_5
    )

    perception_row.p_6 = (
        payload.p_6
    )

    perception_row.p_7 = (
        payload.p_7
    )

    perception_row.p_8 = (
        payload.p_8
    )

    perception_row.p_9 = (
        payload.p_9
    )

    perception_row.p_10 = (
        payload.p_10
    )

    perception_row.p_11 = (
        payload.p_11
    )

    perception_row.p_12 = (
        payload.p_12
    )

    perception_row.p_13 = (
        payload.p_13
    )

    perception_row.p_14 = (
        payload.p_14
    )

    perception_row.p_15 = (
        payload.p_15
    )

    perception_row.p_16 = (
        payload.p_16
    )

    perception_row.p_17 = (
        payload.p_17
    )

    perception_row.p_18 = (
        payload.p_18
    )

    perception_row.p_19 = (
        payload.p_19
    )

    perception_row.p_20 = (
        payload.p_20
    )

    perception_row.p_21 = (
        payload.p_21
    )

    perception_row.p_22 = (
        payload.p_22
    )


    history_row = PerceptionScoreTableHistory(

        session_id=payload.session_id,

        p_1=(
            payload.p_1
        ),

        p_2=(
            payload.p_2
        ),

        p_3=(
            payload.p_3
        ),

        p_4=(
            payload.p_4
        ),

        p_5=(
            payload.p_5
        ),

        p_6=(
            payload.p_6
        ),

        p_7=(
            payload.p_7
        ),

        p_8=(
            payload.p_8
        ),

        p_9=(
            payload.p_9
        ),

        p_10=(
            payload.p_10
        ),

        p_11=(
            payload.p_11
        ),

        p_12=(
            payload.p_12
        ),

        p_13=(
            payload.p_13
        ),

        p_14=(
            payload.p_14
        ),

        p_15=(
            payload.p_15
        ),

        p_16=(
            payload.p_16
        ),

        p_17=(
            payload.p_17
        ),

        p_18=(
            payload.p_18
        ),

        p_19=(
            payload.p_19
        ),

        p_20=(
            payload.p_20
        ),

        p_21=(
            payload.p_21
        ),

        p_22=(
            payload.p_22
        )
    )

    db.add(history_row)

    session.current_stage = "perception"

    db.commit()

    return {
        "success": True,
        "message": (
            "Perception stage submitted successfully."
        ),
        "next_stage": "personality"
    }


def get_perception_stage(
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

    perception_row = (
        db.query(PerceptionScoreTable)
        .filter(
            PerceptionScoreTable.session_id
            == session_id
        )
        .first()
    )

    return perception_row
