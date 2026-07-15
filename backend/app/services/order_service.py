from uuid import UUID
from sqlalchemy.orm import Session
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.cart_item import CartItem
from app.models.pre_cart_item import PreCartItem
from app.models.address import Address
from app.models.price_config import PriceConfig
from app.services.pincode_service import check_pincode_delivery
from uuid6 import uuid7
import razorpay
from app.core.config import settings


async def _calculate_order_costs(db: Session, session_id: UUID, user_id: UUID, pincode: str) -> tuple[float, float, list]:
    # 1. Fetch active cart items linked to the session
    cart_items = (
        db.query(CartItem)
        .join(PreCartItem, CartItem.pre_cart_item_id == PreCartItem.id)
        .filter(PreCartItem.session_id == session_id, PreCartItem.user_id == user_id)
        .all()
    )

    if not cart_items:
        raise ValueError("Cart is empty.")

    # 2. Get price configs
    price_configs = db.query(PriceConfig).all()
    price_map = {cfg.size: float(cfg.price) for cfg in price_configs}
    # Fallbacks
    if "50ml" not in price_map:
        price_map["50ml"] = 800.0
    if "100ml" not in price_map:
        price_map["100ml"] = 1200.0

    total_items_price = 0.0
    item_details = []

    for c_item in cart_items:
        # Fetch linked pre-cart item for combo details
        pre_item = db.query(PreCartItem).filter(PreCartItem.id == c_item.pre_cart_item_id).first()
        if not pre_item:
            continue
        
        unit_price = price_map.get(c_item.size, 1200.0)
        item_total = unit_price * c_item.qty
        total_items_price += item_total

        item_details.append({
            "cart_item": c_item,
            "pre_cart_item": pre_item,
            "unit_price": unit_price,
            "item_total": item_total
        })

    # 3. Calculate delivery charge
    delivery_charge = 100.0
    try:
        delivery_check = await check_pincode_delivery(pincode)
        if delivery_check.get("free_delivery", False):
            delivery_charge = 0.0
    except Exception as e:
        # Fallback to standard delivery charge on check failure
        print(f"NimbusPost check failed: {str(e)}")
        delivery_charge = 100.0

    return total_items_price, delivery_charge, item_details


async def get_checkout_summary(db: Session, session_id: UUID, user_id: UUID, address_id: UUID) -> dict:
    address = db.query(Address).filter(Address.id == address_id).first()
    if not address or address.deleted:
        return {"success": False, "message": "Shipping address not found."}

    try:
        total_items_price, delivery_charge, item_details = await _calculate_order_costs(
            db, session_id, user_id, address.pincode
        )
    except ValueError as e:
        return {"success": False, "message": str(e)}

    formatted_items = []
    for detail in item_details:
        c_item = detail["cart_item"]
        pre_item = detail["pre_cart_item"]
        formatted_items.append({
            "pre_cart_item_id": str(pre_item.id),
            "combo_name": pre_item.combo_name,
            "size": c_item.size,
            "qty": c_item.qty,
            "price": detail["unit_price"],
            "total_price": detail["item_total"]
        })

    address_details = {
        "consignee_name": address.consignee_name,
        "phone_number": address.phone_number,
        "secondary_phone_number": address.secondary_phone_number,
        "address_type": address.address_type,
        "address_line_1": address.address_line_1,
        "address_line_2": address.address_line_2,
        "city": address.city,
        "state": address.state,
        "pincode": address.pincode
    }

    return {
        "success": True,
        "items": formatted_items,
        "total_items_price": total_items_price,
        "delivery_charge": delivery_charge,
        "payable_amount": total_items_price + delivery_charge,
        "address": address_details
    }


async def create_order(db: Session, session_id: UUID, user_id: UUID, address_id: UUID) -> dict:
    address = db.query(Address).filter(Address.id == address_id).first()
    if not address or address.deleted:
        return {"success": False, "message": "Shipping address not found."}

    try:
        total_items_price, delivery_charge, _ = await _calculate_order_costs(
            db, session_id, user_id, address.pincode
        )
    except ValueError as e:
        return {"success": False, "message": str(e)}

    payable_amount = total_items_price + delivery_charge

    # Create Razorpay order using SDK
    try:
        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        receipt_id = f"rec_{str(uuid7())[:20]}"
        razorpay_order_data = {
            "amount": int(payable_amount * 100),  # in paise
            "currency": "INR",
            "receipt": receipt_id,
            "payment_capture": 1
        }
        razorpay_order = client.order.create(data=razorpay_order_data)
        razorpay_order_id = razorpay_order['id']
    except Exception as e:
        print(f"Razorpay order creation failed, fallback to mock: {str(e)}")
        razorpay_order_id = f"order_{str(uuid7()).replace('-', '')[:14]}"

    order = Order(
        user_id=user_id,
        session_id=session_id,
        address_id=address_id,
        total_amount=total_items_price,
        delivery_charge=delivery_charge,
        payable_amount=payable_amount,
        status="pending_payment",
        razorpay_order_id=razorpay_order_id
    )
    db.add(order)
    db.commit()
    db.refresh(order)

    return {
        "success": True,
        "order_id": str(order.id),
        "payable_amount": float(order.payable_amount),
        "razorpay_order_id": order.razorpay_order_id
    }


def verify_payment(
    db: Session, 
    order_id: UUID, 
    user_id: UUID, 
    razorpay_payment_id: str | None, 
    razorpay_signature: str | None
) -> dict:
    order = db.query(Order).filter(Order.id == order_id, Order.user_id == user_id).first()
    if not order:
        return {"success": False, "message": "Order not found."}

    if order.status != "pending_payment":
        return {"success": False, "message": f"Order already processed. Current status: {order.status}"}

    # Verify payment signature if it's not a mock payment
    if razorpay_signature and not razorpay_signature.startswith("sig_"):
        try:
            client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
            params_dict = {
                'razorpay_order_id': order.razorpay_order_id,
                'razorpay_payment_id': razorpay_payment_id,
                'razorpay_signature': razorpay_signature
            }
            client.utility.verify_payment_signature(params_dict)
        except Exception as e:
            return {"success": False, "message": f"Payment signature verification failed: {str(e)}"}

    try:
        # Fetch active cart items linked to the session
        cart_items = (
            db.query(CartItem)
            .join(PreCartItem, CartItem.pre_cart_item_id == PreCartItem.id)
            .filter(PreCartItem.session_id == order.session_id, PreCartItem.user_id == user_id)
            .all()
        )

        if not cart_items:
            return {"success": False, "message": "No active cart items found to place this order."}

        # Query price configs for snapshots
        price_configs = db.query(PriceConfig).all()
        price_map = {cfg.size: float(cfg.price) for cfg in price_configs}
        if "50ml" not in price_map:
            price_map["50ml"] = 800.0
        if "100ml" not in price_map:
            price_map["100ml"] = 1200.0

        # Create OrderItem snapshots
        for c_item in cart_items:
            pre_item = db.query(PreCartItem).filter(PreCartItem.id == c_item.pre_cart_item_id).first()
            if not pre_item:
                continue

            unit_price = price_map.get(c_item.size, 1200.0)

            order_item = OrderItem(
                order_id=order.id,
                size=c_item.size,
                qty=c_item.qty,
                price=unit_price,
                combo_name=pre_item.combo_name,
                description=pre_item.description,
                accord_1_id=pre_item.accord_1_id,
                accord_1_volume_ml=pre_item.accord_1_volume_ml,
                accord_2_id=pre_item.accord_2_id,
                accord_2_volume_ml=pre_item.accord_2_volume_ml,
                accord_3_id=pre_item.accord_3_id,
                accord_3_volume_ml=pre_item.accord_3_volume_ml,
            )
            db.add(order_item)

        # Clear the active cart items for this session
        cart_item_ids = [c.id for c in cart_items]
        db.query(CartItem).filter(CartItem.id.in_(cart_item_ids)).delete(synchronize_session=False)

        # Update order details
        order.status = "payment_completed"
        order.razorpay_payment_id = razorpay_payment_id or f"pay_{str(uuid7()).replace('-', '')[:14]}"
        order.razorpay_signature = razorpay_signature or f"sig_{str(uuid7()).replace('-', '')[:14]}"
        
        db.commit()
        return {"success": True, "message": "Payment verified successfully. Order completed."}
    except Exception as e:
        db.rollback()
        return {"success": False, "message": f"Failed to complete order verification: {str(e)}"}


def get_order_history(db: Session, user_id: UUID) -> list:
    orders = (
        db.query(Order)
        .filter(Order.user_id == user_id)
        .order_by(Order.created_at.desc())
        .all()
    )

    history_list = []
    for order in orders:
        # Skip incomplete orders
        if order.status in ["pending_payment", "payment_failed"]:
            continue

        address = db.query(Address).filter(Address.id == order.address_id).first()
        if not address:
            continue

        items = db.query(OrderItem).filter(OrderItem.order_id == order.id).all()
        
        formatted_items = []
        for it in items:
            formatted_items.append({
                "id": it.id,
                "size": it.size,
                "qty": it.qty,
                "price": float(it.price),
                "combo_name": it.combo_name,
                "description": it.description,
                "accord_1_id": it.accord_1_id,
                "accord_1_volume_ml": float(it.accord_1_volume_ml),
                "accord_2_id": it.accord_2_id,
                "accord_2_volume_ml": float(it.accord_2_volume_ml) if it.accord_2_volume_ml else None,
                "accord_3_id": it.accord_3_id,
                "accord_3_volume_ml": float(it.accord_3_volume_ml) if it.accord_3_volume_ml else None,
            })

        address_details = {
            "consignee_name": address.consignee_name,
            "phone_number": address.phone_number,
            "secondary_phone_number": address.secondary_phone_number,
            "address_type": address.address_type,
            "address_line_1": address.address_line_1,
            "address_line_2": address.address_line_2,
            "city": address.city,
            "state": address.state,
            "pincode": address.pincode
        }

        history_list.append({
            "id": order.id,
            "created_at": order.created_at,
            "status": order.status,
            "total_amount": float(order.total_amount),
            "delivery_charge": float(order.delivery_charge),
            "payable_amount": float(order.payable_amount),
            "address": address_details,
            "items": formatted_items
        })

    return history_list
