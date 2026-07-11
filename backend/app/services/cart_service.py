from uuid import UUID
from sqlalchemy.orm import Session
from app.models.pre_cart_item import PreCartItem
from app.models.cart_item import CartItem
from app.models.price_config import PriceConfig
from app.models.cart_activity_trace import CartActivityTrace
from app.models.master_accord_table import MasterAccordTable


def _get_accord_name_map(db: Session) -> dict:
    """Returns a dict of {accord_key: accord_name} from master table."""
    master_accords = db.query(MasterAccordTable).all()
    return {acc.key: acc.name for acc in master_accords}


def get_cart_data(db: Session, session_id: UUID, user_id: UUID) -> dict:
    """
    Fetches the 3 recommendation combinations (pre_cart_items) generated for the session,
    along with any active cart selections (sizes & quantities) from cart_items.
    """
    # 1. Fetch pre_cart_items
    pre_items = (
        db.query(PreCartItem)
        .filter(
            PreCartItem.session_id == session_id,
            PreCartItem.user_id == user_id
        )
        .order_by(PreCartItem.recommendation_rank)
        .all()
    )

    if not pre_items:
        return {"success": False, "message": "No recommendations found for this session."}

    accord_name_map = _get_accord_name_map(db)

    # 2. Fetch cart_items linked to these pre_cart_items
    pre_item_ids = [item.id for item in pre_items]
    cart_items = (
        db.query(CartItem)
        .filter(CartItem.pre_cart_item_id.in_(pre_item_ids))
        .all()
    )

    # Group cart selections by pre_cart_item_id
    cart_items_map = {}
    for c_item in cart_items:
        cart_items_map.setdefault(c_item.pre_cart_item_id, []).append({
            "cart_item_id": str(c_item.id),
            "qty": c_item.qty,
            "size": c_item.size
        })

    formatted_combinations = []
    for item in pre_items:
        formula = []
        if item.accord_1_id:
            formula.append({
                "accord_id": item.accord_1_id,
                "accord_name": accord_name_map.get(item.accord_1_id, item.accord_1_id),
                "volume_ml": float(item.accord_1_volume_ml)
            })
        if item.accord_2_id:
            formula.append({
                "accord_id": item.accord_2_id,
                "accord_name": accord_name_map.get(item.accord_2_id, item.accord_2_id),
                "volume_ml": float(item.accord_2_volume_ml)
            })
        if item.accord_3_id:
            formula.append({
                "accord_id": item.accord_3_id,
                "accord_name": accord_name_map.get(item.accord_3_id, item.accord_3_id),
                "volume_ml": float(item.accord_3_volume_ml)
            })

        formatted_combinations.append({
            "pre_cart_item_id": str(item.id),
            "recommendation_rank": item.recommendation_rank,
            "is_default_selected": item.is_default_selected,
            "combo_name": item.combo_name,
            "description": item.description,
            "justification": item.justification,
            "formula": formula,
            "selections": cart_items_map.get(item.id, [])
        })

    return {
        "success": True,
        "session_id": str(session_id),
        "combinations": formatted_combinations
    }


def save_cart_selection(
    db: Session,
    session_id: UUID,
    user_id: UUID,
    payload_items: list
) -> dict:
    """
    Bulk saves/replaces the selections for this user session in the cart_items table.
    Expects payload_items format:
    [
        {
            "pre_cart_item_id": "uuid-string",
            "selections": [{"size": "50ml", "qty": 1}, ...]
        }
    ]
    """
    try:
        # Fetch pre_cart_items for validation
        pre_items = (
            db.query(PreCartItem)
            .filter(
                PreCartItem.session_id == session_id,
                PreCartItem.user_id == user_id
            )
            .all()
        )
        pre_item_ids = {item.id for item in pre_items}

        # Validate pre_cart_item_ids
        for item in payload_items:
            p_id = UUID(item["pre_cart_item_id"])
            if p_id not in pre_item_ids:
                return {"success": False, "message": f"Invalid pre_cart_item_id: {p_id}"}

        # Remove existing cart_items for these pre_cart_items
        db.query(CartItem).filter(CartItem.pre_cart_item_id.in_(list(pre_item_ids))).delete(
            synchronize_session=False
        )

        # Create new cart_items
        for item in payload_items:
            p_id = UUID(item["pre_cart_item_id"])
            selections = item.get("selections", [])
            for sel in selections:
                size = sel.get("size")
                qty = sel.get("qty", 1)
                if qty > 0:
                    cart_item = CartItem(
                        pre_cart_item_id=p_id,
                        size=size,
                        qty=qty
                    )
                    db.add(cart_item)

        db.commit()
        return {"success": True, "message": "Cart selections saved successfully."}
    except Exception as e:
        db.rollback()
        return {"success": False, "message": f"Failed to save cart: {str(e)}"}


def log_cart_activity_trace(
    db: Session,
    session_id: UUID,
    user_id: UUID,
    pre_cart_item_id: UUID | None,
    combo_name: str | None,
    action_type: str,
    size: str | None,
    old_qty: int | None,
    new_qty: int | None
) -> dict:
    """Logs a single user action to cart_activity_traces in real-time."""
    try:
        trace = CartActivityTrace(
            user_id=user_id,
            session_id=session_id,
            pre_cart_item_id=pre_cart_item_id,
            combo_name=combo_name,
            action_type=action_type,
            size=size,
            old_qty=old_qty,
            new_qty=new_qty
        )
        db.add(trace)
        db.commit()
        return {"success": True, "message": "Activity trace logged."}
    except Exception as e:
        db.rollback()
        return {"success": False, "message": f"Failed to log activity trace: {str(e)}"}
