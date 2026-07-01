import json
from uuid import UUID
from typing import Optional

from sqlalchemy.orm import Session

from app.models.pre_cart_item import PreCartItem
from app.models.cart_activity_trace import CartActivityTrace
from app.models.final_user_recommendation import FinalUserRecommendation
from app.models.master_accord_table import MasterAccordTable


def _get_accord_name_map(db: Session) -> dict:
    """Returns a dict of {accord_key: accord_name} from master table."""
    master_accords = db.query(MasterAccordTable).all()
    return {acc.key: acc.name for acc in master_accords}


def _parse_combinations_from_db(db: Session, session_id: UUID) -> tuple[list, str | None]:
    """
    Reads the LLM JSON from final_user_recommendation table for a session.
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


def _log_activity_trace(
    db: Session,
    user_id: UUID,
    session_id: UUID,
    action_type: str,
    rank: int,
    combo_name: str,
    formula: list,
    old_qty: Optional[int] = None,
    new_qty: Optional[int] = None,
):
    """Inserts a single audit trace to cart_activity_traces."""
    trace = CartActivityTrace(
        user_id=user_id,
        session_id=session_id,
        action_type=action_type,
        recommendation_rank=rank,
        combo_name=combo_name,
        formula_snapshot={"formula": formula},
        old_quantity=old_qty,
        new_quantity=new_qty,
    )
    db.add(trace)


def get_recommendation_page_data(
    db: Session,
    session_id: UUID,
    user_id: UUID,
) -> dict:
    """
    Fetches display data for the recommendation page.
    Directly checks active items in pre_cart_items for selection/quantity state.
    """
    combinations, error = _parse_combinations_from_db(db, session_id)
    if error:
        return {"success": False, "message": error}

    accord_name_map = _get_accord_name_map(db)

    # Fetch all active pre_cart_items for this session/user
    active_items = (
        db.query(PreCartItem)
        .filter(
            PreCartItem.session_id == session_id,
            PreCartItem.user_id == user_id,
        )
        .all()
    )

    # Map rank -> cart details (quantity)
    rank_selections = {item.recommendation_rank: item.quantity for item in active_items}

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

        is_in_cart = rank in rank_selections
        
        # When no active selections exist in DB (e.g. first view), rank 1 is pre-selected
        if not rank_selections:
            status = "selected" if rank == 1 else "not_selected"
            qty = 1
        else:
            status = "selected" if is_in_cart else "not_selected"
            qty = rank_selections[rank] if is_in_cart else 1

        formatted_combinations.append({
            "combo_id": combo.get("id", f"comb_{rank}"),
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
    Saves selection updates in a single table pre_cart_items.
    Inserts on new selection, updates on qty change, and deletes on unselect.
    Logs all edits in cart_activity_traces.
    """
    combinations, error = _parse_combinations_from_db(db, session_id)
    if error:
        return {"success": False, "message": error}

    qty_updates = qty_updates or {}
    selected_ids_str = [str(x) for x in selected_combo_ids]

    # Fetch existing selections from pre_cart_items
    existing_items = (
        db.query(PreCartItem)
        .filter(
            PreCartItem.session_id == session_id,
            PreCartItem.user_id == user_id,
        )
        .all()
    )

    # Map rank -> PreCartItem object
    rank_item_map = {item.recommendation_rank: item for item in existing_items}

    selected_count = 0

    for rank, combo in enumerate(combinations, start=1):
        combo_id = combo.get("id", f"comb_{rank}")
        combo_name = combo.get("name", f"Combination {rank}")
        formula = combo.get("formula", [])

        is_selected = combo_id in selected_ids_str
        target_qty = max(1, int(qty_updates.get(combo_id, 1)))

        existing_item = rank_item_map.get(rank)

        if is_selected:
            selected_count += 1
            if not existing_item:
                # ── Action: Select (Insert) ──
                accord_1_id = formula[0]["accord_id"] if len(formula) > 0 else None
                accord_1_vol = float(formula[0]["qty"]) if len(formula) > 0 else None
                accord_2_id = formula[1]["accord_id"] if len(formula) > 1 else None
                accord_2_vol = float(formula[1]["qty"]) if len(formula) > 1 else None
                accord_3_id = formula[2]["accord_id"] if len(formula) > 2 else None
                accord_3_vol = float(formula[2]["qty"]) if len(formula) > 2 else None

                pre_cart_item = PreCartItem(
                    user_id=user_id,
                    session_id=session_id,
                    recommendation_rank=rank,
                    is_default_selected=(rank == 1),
                    accord_1_id=accord_1_id,
                    accord_1_volume_ml=accord_1_vol,
                    accord_2_id=accord_2_id,
                    accord_2_volume_ml=accord_2_vol,
                    accord_3_id=accord_3_id,
                    accord_3_volume_ml=accord_3_vol,
                    quantity=target_qty,
                    combo_name=combo_name,
                    description=combo.get("description", ""),
                    justification=combo.get("justification", ""),
                )
                db.add(pre_cart_item)

                _log_activity_trace(
                    db=db,
                    user_id=user_id,
                    session_id=session_id,
                    action_type="select",
                    rank=rank,
                    combo_name=combo_name,
                    formula=formula,
                    new_qty=target_qty,
                )
            else:
                # ── Action: Potential Qty Change (Update) ──
                if existing_item.quantity != target_qty:
                    old_qty = existing_item.quantity
                    existing_item.quantity = target_qty
                    
                    _log_activity_trace(
                        db=db,
                        user_id=user_id,
                        session_id=session_id,
                        action_type="qty_change",
                        rank=rank,
                        combo_name=combo_name,
                        formula=formula,
                        old_qty=old_qty,
                        new_qty=target_qty,
                    )
        else:
            # ── Action: Unselect / Remove (Delete) ──
            if existing_item:
                old_qty = existing_item.quantity
                
                # Delete directly from pre_cart_items (no secondary table cleanup needed!)
                db.delete(existing_item)

                _log_activity_trace(
                    db=db,
                    user_id=user_id,
                    session_id=session_id,
                    action_type="unselect",
                    rank=rank,
                    combo_name=combo_name,
                    formula=formula,
                    old_qty=old_qty,
                )

    db.commit()

    return {
        "success": True,
        "message": "Selection synced successfully.",
        "selected_count": selected_count,
    }
