from sqlalchemy.orm import Session

from app.services.climate_score_table import (
    ClimateScoreService,
)
from app.services.accord_score_service import (
    compute_and_store_all_accord_scores,
)
from app.models.user_session import UserSession
from app.services.llm.recommendation_service import LLMRecommendationService


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

    # STEP 2 -> Final accord table generation (calculation and pre-processing)
    try:
        accord_scores = compute_and_store_all_accord_scores(
            session_id=payload.session_id,
            db=db,
            climate_result=climate_result["climate_code"],
        )

    except ValueError as error:

        return {
            "success": False,
            "message": str(error),
        }

    # STEP 3
    # LLM recommendation generation
    try:
        recommendation_text = LLMRecommendationService(db).generate_recommendations(
            session_id=payload.session_id,
            current_user=current_user
        )
    except Exception as error:
        return {
            "success": False,
            "message": f"LLM Recommendation failed: {str(error)}"
        }

    return {
        "success": True,
        "message": recommendation_text
    }
