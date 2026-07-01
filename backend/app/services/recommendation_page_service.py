import json
from datetime import datetime, timezone
from uuid import UUID
from typing import Optional

from sqlalchemy.orm import Session

from app.models.cart_product import CartProduct
from app.models.pre_cart_item import PreCartItem
from app.models.final_user_recommendation import FinalUserRecommendation
from app.models.master_accord_table import MasterAccordTable
from app.models.enums import PreCartStatus


def _get_accord_name_map(db: Session) -> dict:
    """Returns a dict of {accord_key: accord_name} from master table."""
    master_accords = db.query(MasterAccordTable).all()
    return {acc.key: acc.name for acc in master_accords}


def _parse_combinations_from_db(db: Session, session_id: UUID) -> tuple[list, str | None]:
    """
    Reads the LLM JSON from final_user_recommendation table for a session.
    Returns (combinations list, error message or None).
    """
    rec_row = (
        db.query(FinalUserRecommendation)
        .filter(FinalUserRecommendation.session_id == session_id)
        .first()
    )

    if not rec_row:
        return [], "No recommendation found for this session. Please complete the quiz first."

    try:
        rec_data = json.loads(rec_row.recommendations)
        combinations = rec_data.get("machine_data", {}).get("combinations", [])
        if not combinations:
            return [], "Recommendation data is incomplete. Please retake the quiz."
        return combinations, None
    except (json.JSONDecodeError, Exception) as e:
        return [], f"Failed to parse recommendation data: {str(e)}"


def get_recommendation_page_data(
    db: Session,
    session_id: UUID,
    user_id: UUID,
) -> dict:
    """
    Fetches recommendation display data from final_user_recommendation table.
    This is called on page load — no pre_cart_items needed yet.

    Also checks if user has already made a selection (pre_cart_items exist)
    so the page can restore previous state when user navigates back.
    """
    combinations, error = _parse_combinations_from_db(db, session_id)
    if error:
        return {"success": False, "message": error}

    accord_name_map = _get_accord_name_map(db)

    # Check if user has already confirmed a selection (for back-navigation restore)
    existing_items = (
        db.query(PreCartItem)
        .filter(
            PreCartItem.session_id == session_id,
            PreCartItem.user_id == user_id,
            PreCartItem.deleted_at.is_(None),
        )
        .all()
    )
    # Map product_id → status for restoring previous selections
    existing_status_map: dict = {}
    existing_qty_map: dict = {}
    if existing_items:
        for item in existing_items:
            cp = db.query(CartProduct).filter(CartProduct.id == item.product_id).first()
            if cp:
                # Use combo_name as key to match back to LLM combo
                existing_status_map[item.recommendation_rank] = item.status.value
                existing_qty_map[item.recommendation_rank] = cp.quantity

    formatted_combinations = []
    for rank, combo in enumerate(combinations, start=1):
        formula = combo.get("formula", [])
        formatted_formula = []
        total_vol = 0.0
        for f in formula:
            vol = float(f.get("qty", 0))
            total_vol += vol
            formatted_formula.append({
                "accord_id": f.get("accord_id", ""),
                "accord_name": accord_name_map.get(f.get("accord_id", ""), f.get("accord_id", "")),
                "volume_ml": vol,
            })

        # Restore previous status if user has been here before, else default rank-1 selected
        if existing_status_map:
            status = existing_status_map.get(rank, "not_selected")
        else:
            status = "selected" if rank == 1 else "not_selected"

        qty = existing_qty_map.get(rank, 1)

        formatted_combinations.append({
            "combo_id": combo.get("id", f"comb_{rank}"),   # e.g. "comb_1"
            "recommendation_rank": rank,
            "is_default_selected": rank == 1,
            "status": status,
            "combo_name": combo.get("name", f"Combination {rank}"),
            "description": combo.get("description", ""),
            "justification": combo.get("justification", ""),
            "formula": formatted_formula,
            "quantity": qty,
            "total_volume_ml": total_vol,
        })

    return {
        "success": True,
        "session_id": str(session_id),
        "combinations": formatted_combinations,
    }


def confirm_cart_selection(
    db: Session,
    session_id: UUID,
    user_id: UUID,
    selected_combo_ids: list[str],
    qty_updates: Optional[dict] = None,
) -> dict:
    """
    Called when user clicks 'Go to Cart'.
    - Parses combos from final_user_recommendation
    - Soft-deletes any previous pre_cart_items for this session
    - Creates fresh cart_products + pre_cart_items for ALL 3 combos
    - Marks status = SELECTED for chosen ones, NOT_SELECTED for others
    """
    combinations, error = _parse_combinations_from_db(db, session_id)
    if error:
        return {"success": False, "message": error}

    accord_name_map = _get_accord_name_map(db)

    # Soft-delete any previously saved pre_cart_items + cart_products for this session
    existing_items = (
        db.query(PreCartItem)
        .filter(
            PreCartItem.session_id == session_id,
            PreCartItem.user_id == user_id,
            PreCartItem.deleted_at.is_(None),
        )
        .all()
    )
    now = datetime.now(timezone.utc)
    for item in existing_items:
        item.deleted_at = now
        cp = db.query(CartProduct).filter(
            CartProduct.id == item.product_id,
            CartProduct.deleted_at.is_(None),
        ).first()
        if cp:
            cp.deleted_at = now
    db.flush()

    created_count = 0
    for rank, combo in enumerate(combinations, start=1):
        formula = combo.get("formula", [])
        combo_id = combo.get("id", f"comb_{rank}")

        accord_1_id = formula[0]["accord_id"] if len(formula) > 0 else None
        accord_1_vol = float(formula[0]["qty"]) if len(formula) > 0 else None
        accord_2_id = formula[1]["accord_id"] if len(formula) > 1 else None
        accord_2_vol = float(formula[1]["qty"]) if len(formula) > 1 else None
        accord_3_id = formula[2]["accord_id"] if len(formula) > 2 else None
        accord_3_vol = float(formula[2]["qty"]) if len(formula) > 2 else None

        # Qty from user input, default 1
        qty = 1
        if qty_updates and combo_id in qty_updates:
            qty = max(1, int(qty_updates[combo_id]))

        # Create cart_product row
        cart_product = CartProduct(
            accord_1_id=accord_1_id,
            accord_1_volume_ml=accord_1_vol,
            accord_2_id=accord_2_id,
            accord_2_volume_ml=accord_2_vol,
            accord_3_id=accord_3_id,
            accord_3_volume_ml=accord_3_vol,
            quantity=qty,
            combo_name=combo.get("name", f"Combination {rank}"),
            description=combo.get("description", ""),
            justification=combo.get("justification", ""),
        )
        db.add(cart_product)
        db.flush()  # Generate cart_product.id via uuid7 default

        # Determine status
        is_selected = combo_id in selected_combo_ids
        status = PreCartStatus.SELECTED if is_selected else PreCartStatus.NOT_SELECTED
        if is_selected:
            created_count += 1

        # Create pre_cart_item row
        pre_cart_item = PreCartItem(
            user_id=user_id,
            session_id=session_id,
            product_id=cart_product.id,
            recommendation_rank=rank,
            is_default_selected=(rank == 1),
            status=status,
        )
        db.add(pre_cart_item)

    db.commit()

    if created_count == 0:
        return {"success": False, "message": "Please select at least one combination."}

    return {
        "success": True,
        "message": "Selection saved. Proceed to cart.",
        "selected_count": created_count,
    }
