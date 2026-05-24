from sqlalchemy.orm import Session

from app.models.user_session import UserSession

from app.models.sensitivity_filter import (
    SensitivityFilter
)

from app.models.sensitivity_filter_history import (
    SensitivityFilterHistory
)


def submit_sensitivity_stage(
    db: Session,
    current_user,
    payload
):
    
    print(UserSession.id)
    print("--------")
    print(payload.session_id)

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

    sensitivity_row = (
        db.query(SensitivityFilter)
        .filter(
            SensitivityFilter.session_id
            == payload.session_id
        )
        .first()
    )

    if not sensitivity_row:

        sensitivity_row = SensitivityFilter(
            session_id=payload.session_id
        )

        db.add(sensitivity_row)

    sensitivity_row.has_migraine_issues = (
        payload.has_migraine_issues
    )

    sensitivity_row.has_respiratory_issues = (
        payload.has_respiratory_issues
    )

    sensitivity_row.has_skin_sensitivity = (
        payload.has_skin_sensitivity
    )

    sensitivity_row.has_strong_smell_discomfort = (
        payload.has_strong_smell_discomfort
    )

    sensitivity_row.has_body_odour_concern = (
        payload.has_body_odour_concern
    )

    history_row = SensitivityFilterHistory(

        session_id=payload.session_id,

        has_migraine_issues=(
            payload.has_migraine_issues
        ),

        has_respiratory_issues=(
            payload.has_respiratory_issues
        ),

        has_skin_sensitivity=(
            payload.has_skin_sensitivity
        ),

        has_strong_smell_discomfort=(
            payload.has_strong_smell_discomfort
        ),

        has_body_odour_concern=(
            payload.has_body_odour_concern
        )
    )

    db.add(history_row)

    db.commit()

    return {
        "success": True,
        "message": (
            "Sensitivity stage submitted successfully."
        ),
        "next_stage": "gender"
    }


def get_sensitivity_stage(
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

    sensitivity_row = (
        db.query(SensitivityFilter)
        .filter(
            SensitivityFilter.session_id
            == session_id
        )
        .first()
    )

    return sensitivity_row