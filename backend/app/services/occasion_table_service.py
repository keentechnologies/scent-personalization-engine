from sqlalchemy.orm import Session

from app.models.user_session import UserSession

from app.models.occasion_table import (
    OccasionTable
)

from app.models.occasion_table_history import (
    OccasionTableHistory
)


def submit_occasion_stage(
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

    oc_1 = (
        True if payload.oc_1 is True else None
    )

    oc_2 = (
        True if payload.oc_2 is True else None
    )

    oc_3 = (
        True if payload.oc_3 is True else None
    )

    oc_4 = (
        True if payload.oc_4 is True else None
    )

    oc_5 = (
        True if payload.oc_5 is True else None
    )

    oc_6 = (
        True if payload.oc_6 is True else None
    )

    oc_7 = (
        True if payload.oc_7 is True else None
    )

    oc_8 = (
        True if payload.oc_8 is True else None
    )

    oc_9 = (
        True if payload.oc_9 is True else None
    )

    oc_10 = (
        True if payload.oc_10 is True else None
    )

    oc_11 = (
        True if payload.oc_11 is True else None
    )

    oc_12 = (
        True if payload.oc_12 is True else None
    )

    oc_13 = (
        True if payload.oc_13 is True else None
    )

    oc_14 = (
        True if payload.oc_14 is True else None
    )

    oc_15 = (
        True if payload.oc_15 is True else None
    )

    oc_16 = (
        True if payload.oc_16 is True else None
    )

    oc_17 = (
        True if payload.oc_17 is True else None
    )

    oc_18 = (
        True if payload.oc_18 is True else None
    )

    oc_19 = (
        True if payload.oc_19 is True else None
    )

    oc_20 = (
        True if payload.oc_20 is True else None
    )

    oc_21 = (
        True if payload.oc_21 is True else None
    )

    oc_22 = (
        True if payload.oc_22 is True else None
    )

    oc_23 = (
        True if payload.oc_23 is True else None
    )

    oc_24 = (
        True if payload.oc_24 is True else None
    )

    oc_25 = (
        True if payload.oc_25 is True else None
    )

    oc_26 = (
        True if payload.oc_26 is True else None
    )

    oc_27 = (
        True if payload.oc_27 is True else None
    )

    oc_28 = (
        True if payload.oc_28 is True else None
    )

    oc_29 = (
        True if payload.oc_29 is True else None
    )

    oc_30 = (
        True if payload.oc_30 is True else None
    )

    oc_31 = (
        True if payload.oc_31 is True else None
    )

    oc_32 = (
        True if payload.oc_32 is True else None
    )

    oc_33 = (
        True if payload.oc_33 is True else None
    )

    oc_34 = (
        True if payload.oc_34 is True else None
    )

    oc_35 = (
        True if payload.oc_35 is True else None
    )

    oc_36 = (
        True if payload.oc_36 is True else None
    )

    oc_37 = (
        True if payload.oc_37 is True else None
    )

    oc_38 = (
        True if payload.oc_38 is True else None
    )

    oc_39 = (
        True if payload.oc_39 is True else None
    )

    oc_40 = (
        True if payload.oc_40 is True else None
    )

    oc_41 = (
        True if payload.oc_41 is True else None
    )

    oc_42 = (
        True if payload.oc_42 is True else None
    )

    oc_43 = (
        True if payload.oc_43 is True else None
    )

    oc_44 = (
        True if payload.oc_44 is True else None
    )

    selected_count = sum([
        oc_1 is True,
        oc_2 is True,
        oc_3 is True,
        oc_4 is True,
        oc_5 is True,
        oc_6 is True,
        oc_7 is True,
        oc_8 is True,
        oc_9 is True,
        oc_10 is True,
        oc_11 is True,
        oc_12 is True,
        oc_13 is True,
        oc_14 is True,
        oc_15 is True,
        oc_16 is True,
        oc_17 is True,
        oc_18 is True,
        oc_19 is True,
        oc_20 is True,
        oc_21 is True,
        oc_22 is True,
        oc_23 is True,
        oc_24 is True,
        oc_25 is True,
        oc_26 is True,
        oc_27 is True,
        oc_28 is True,
        oc_29 is True,
        oc_30 is True,
        oc_31 is True,
        oc_32 is True,
        oc_33 is True,
        oc_34 is True,
        oc_35 is True,
        oc_36 is True,
        oc_37 is True,
        oc_38 is True,
        oc_39 is True,
        oc_40 is True,
        oc_41 is True,
        oc_42 is True,
        oc_43 is True,
        oc_44 is True
    ])

    if selected_count == 0:

        return {
            "success": False,
            "message": (
                "Please select at least one occasion before continuing."
            )
        }

    occasion_row = (
        db.query(OccasionTable)
        .filter(
            OccasionTable.session_id
            == payload.session_id
        )
        .first()
    )

    if not occasion_row:

        occasion_row = OccasionTable(
            session_id=payload.session_id
        )

        db.add(occasion_row)

    occasion_row.oc_1 = (
        oc_1
    )

    occasion_row.oc_2 = (
        oc_2
    )

    occasion_row.oc_3 = (
        oc_3
    )

    occasion_row.oc_4 = (
        oc_4
    )

    occasion_row.oc_5 = (
        oc_5
    )

    occasion_row.oc_6 = (
        oc_6
    )

    occasion_row.oc_7 = (
        oc_7
    )

    occasion_row.oc_8 = (
        oc_8
    )

    occasion_row.oc_9 = (
        oc_9
    )

    occasion_row.oc_10 = (
        oc_10
    )

    occasion_row.oc_11 = (
        oc_11
    )

    occasion_row.oc_12 = (
        oc_12
    )

    occasion_row.oc_13 = (
        oc_13
    )

    occasion_row.oc_14 = (
        oc_14
    )

    occasion_row.oc_15 = (
        oc_15
    )

    occasion_row.oc_16 = (
        oc_16
    )

    occasion_row.oc_17 = (
        oc_17
    )

    occasion_row.oc_18 = (
        oc_18
    )

    occasion_row.oc_19 = (
        oc_19
    )

    occasion_row.oc_20 = (
        oc_20
    )

    occasion_row.oc_21 = (
        oc_21
    )

    occasion_row.oc_22 = (
        oc_22
    )

    occasion_row.oc_23 = (
        oc_23
    )

    occasion_row.oc_24 = (
        oc_24
    )

    occasion_row.oc_25 = (
        oc_25
    )

    occasion_row.oc_26 = (
        oc_26
    )

    occasion_row.oc_27 = (
        oc_27
    )

    occasion_row.oc_28 = (
        oc_28
    )

    occasion_row.oc_29 = (
        oc_29
    )

    occasion_row.oc_30 = (
        oc_30
    )

    occasion_row.oc_31 = (
        oc_31
    )

    occasion_row.oc_32 = (
        oc_32
    )

    occasion_row.oc_33 = (
        oc_33
    )

    occasion_row.oc_34 = (
        oc_34
    )

    occasion_row.oc_35 = (
        oc_35
    )

    occasion_row.oc_36 = (
        oc_36
    )

    occasion_row.oc_37 = (
        oc_37
    )

    occasion_row.oc_38 = (
        oc_38
    )

    occasion_row.oc_39 = (
        oc_39
    )

    occasion_row.oc_40 = (
        oc_40
    )

    occasion_row.oc_41 = (
        oc_41
    )

    occasion_row.oc_42 = (
        oc_42
    )

    occasion_row.oc_43 = (
        oc_43
    )

    occasion_row.oc_44 = (
        oc_44
    )

    history_row = OccasionTableHistory(

        session_id=payload.session_id,

        oc_1=(
            oc_1
        ),

        oc_2=(
            oc_2
        ),

        oc_3=(
            oc_3
        ),

        oc_4=(
            oc_4
        ),

        oc_5=(
            oc_5
        ),

        oc_6=(
            oc_6
        ),

        oc_7=(
            oc_7
        ),

        oc_8=(
            oc_8
        ),

        oc_9=(
            oc_9
        ),

        oc_10=(
            oc_10
        ),

        oc_11=(
            oc_11
        ),

        oc_12=(
            oc_12
        ),

        oc_13=(
            oc_13
        ),

        oc_14=(
            oc_14
        ),

        oc_15=(
            oc_15
        ),

        oc_16=(
            oc_16
        ),

        oc_17=(
            oc_17
        ),

        oc_18=(
            oc_18
        ),

        oc_19=(
            oc_19
        ),

        oc_20=(
            oc_20
        ),

        oc_21=(
            oc_21
        ),

        oc_22=(
            oc_22
        ),

        oc_23=(
            oc_23
        ),

        oc_24=(
            oc_24
        ),

        oc_25=(
            oc_25
        ),

        oc_26=(
            oc_26
        ),

        oc_27=(
            oc_27
        ),

        oc_28=(
            oc_28
        ),

        oc_29=(
            oc_29
        ),

        oc_30=(
            oc_30
        ),

        oc_31=(
            oc_31
        ),

        oc_32=(
            oc_32
        ),

        oc_33=(
            oc_33
        ),

        oc_34=(
            oc_34
        ),

        oc_35=(
            oc_35
        ),

        oc_36=(
            oc_36
        ),

        oc_37=(
            oc_37
        ),

        oc_38=(
            oc_38
        ),

        oc_39=(
            oc_39
        ),

        oc_40=(
            oc_40
        ),

        oc_41=(
            oc_41
        ),

        oc_42=(
            oc_42
        ),

        oc_43=(
            oc_43
        ),

        oc_44=(
            oc_44
        )
    )

    db.add(history_row)

    session.current_stage = "occasion"

    db.commit()

    return {
        "success": True,
        "message": (
            "Occasion stage submitted successfully."
        ),
        "next_stage": "climate"
    }


def get_occasion_stage(
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

    occasion_row = (
        db.query(OccasionTable)
        .filter(
            OccasionTable.session_id
            == session_id
        )
        .first()
    )

    return occasion_row
