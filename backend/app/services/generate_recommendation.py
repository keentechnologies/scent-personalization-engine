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


    # Save pincode in session
    session.pincode = payload.pincode
    db.commit()

    # STEP 1 -> calculate climate profile and save into db
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

    # STEP 3 -> LLM recommendation generation
    # Result is saved to final_user_recommendation table inside LLMRecommendationService
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

    # STEP 4 -> Auto-populate pre_cart_items and default select Rank 1 in cart_items
    import json
    from app.models.pre_cart_item import PreCartItem
    from app.models.cart_item import CartItem
    from app.models.price_config import PriceConfig
    from app.models.cart_activity_trace import CartActivityTrace

    try:
        # Clear existing selections for this session to support quiz retakes
        db.query(PreCartItem).filter(PreCartItem.session_id == payload.session_id).delete()
        db.commit()

        rec_data = json.loads(recommendation_text)
        combinations = rec_data.get("machine_data", {}).get("combinations", [])
        
        created_pre_items = []
        for rank, combo in enumerate(combinations, start=1):
            combo_name = combo.get("name", f"Combination {rank}")
            formula = combo.get("formula", [])

            accord_1_id = formula[0]["accord_id"] if len(formula) > 0 else None
            accord_1_vol = float(formula[0]["qty"]) if len(formula) > 0 else None
            accord_2_id = formula[1]["accord_id"] if len(formula) > 1 else None
            accord_2_vol = float(formula[1]["qty"]) if len(formula) > 1 else None
            accord_3_id = formula[2]["accord_id"] if len(formula) > 2 else None
            accord_3_vol = float(formula[2]["qty"]) if len(formula) > 2 else None

            pre_cart_item = PreCartItem(
                user_id=current_user.id,
                session_id=payload.session_id,
                recommendation_rank=rank,
                is_default_selected=(rank == 1),
                accord_1_id=accord_1_id,
                accord_1_volume_ml=accord_1_vol,
                accord_2_id=accord_2_id,
                accord_2_volume_ml=accord_2_vol,
                accord_3_id=accord_3_id,
                accord_3_volume_ml=accord_3_vol,
                quantity=1,
                combo_name=combo_name,
                description=combo.get("description", ""),
                justification=combo.get("justification", ""),
            )
            db.add(pre_cart_item)
            created_pre_items.append((rank, pre_cart_item))
        
        db.commit() # Commit to generate UUID primary keys

        # Default select rank 1 in cart_items (100ml, quantity 1)
        rank_1_item = next((item for rank, item in created_pre_items if rank == 1), None)
        if rank_1_item:
            default_cart_item = CartItem(
                pre_cart_item_id=rank_1_item.id,
                qty=1,
                size="100ml"
            )
            db.add(default_cart_item)
            
            # Log the default action in trace table
            default_trace = CartActivityTrace(
                user_id=current_user.id,
                session_id=payload.session_id,
                pre_cart_item_id=rank_1_item.id,
                combo_name=rank_1_item.combo_name,
                action_type="add_card",
                size="100ml",
                old_qty=0,
                new_qty=1
            )
            db.add(default_trace)
            
            db.commit()

    except Exception as e:
        db.rollback()
        return {
            "success": False,
            "message": f"Failed to auto-populate cart items: {str(e)}"
        }

    return {
        "success": True,
        "message": recommendation_text,
    }
