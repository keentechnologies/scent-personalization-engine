from sqlalchemy.orm import Session

from app.services.climate_score_table import (
    ClimateScoreService,
)
from app.models.user_session import UserSession


def generate_recommendation(
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
    
    
    # STEP 1 -> calculate climate profile and save the same into db
    try:
        climate_result = ClimateScoreService(
            db=db,
        ).generate_climate_profile(
            session_id=payload.session_id,
            pincode=payload.pincode,
        )

    except ValueError as error:

        return {
            "success": False,
            "message": str(error),
        }

    # STEP 2
    # Master profile generation

    # STEP 3
    # Score calculation

    # STEP 4
    # Accord processing

    # STEP 5
    # Candidate selection

    # STEP 6
    # LLM recommendation generation

    return {
        "success": True,
        "message": str(climate_result)
    }
