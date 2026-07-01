from uuid import UUID
from typing import Optional
from sqlalchemy.orm import Session

from app.models.address import Address
from app.models.user_address import UserAddress
from app.schemas.address import AddressCreate, AddressUpdate


def get_user_addresses(db: Session, user_id: UUID) -> list[dict]:
    """
    Fetches all saved addresses for a user, ordered by most recent.
    """
    results = (
        db.query(Address, UserAddress.is_default)
        .join(UserAddress, UserAddress.address_id == Address.id)
        .filter(UserAddress.user_id == user_id)
        .order_by(UserAddress.created_at.desc())
        .all()
    )
    return [
        {
            "id": addr.id,
            "consignee_name": addr.consignee_name,
            "phone_number": addr.phone_number,
            "secondary_phone_number": addr.secondary_phone_number,
            "address_type": addr.address_type,
            "address_line_1": addr.address_line_1,
            "address_line_2": addr.address_line_2,
            "city": addr.city,
            "state": addr.state,
            "pincode": addr.pincode,
            "is_default": is_default,
        }
        for addr, is_default in results
    ]


def create_address(db: Session, user_id: UUID, payload: AddressCreate) -> Address:
    """
    Creates a new address, making it default by default (and setting others to false).
    """
    # 1. Set all other addresses for this user to is_default = False
    db.query(UserAddress).filter(UserAddress.user_id == user_id).update({"is_default": False})
    db.flush()

    # 2. Insert into Address table
    addr = Address(
        consignee_name=payload.consignee_name,
        phone_number=payload.phone_number,
        secondary_phone_number=payload.secondary_phone_number,
        address_type=payload.address_type,
        address_line_1=payload.address_line_1,
        address_line_2=payload.address_line_2,
        city=payload.city,
        state=payload.state,
        pincode=payload.pincode,
    )
    db.add(addr)
    db.flush()

    # 3. Create mapping in UserAddress junction table
    user_addr = UserAddress(
        user_id=user_id,
        address_id=addr.id,
        is_default=True,
    )
    db.add(user_addr)
    
    db.commit()
    return addr


def update_address(
    db: Session,
    user_id: UUID,
    address_id: UUID,
    payload: AddressUpdate,
) -> Optional[Address]:
    """
    Updates details of an address if it belongs to the user.
    """
    mapping = (
        db.query(UserAddress)
        .filter(UserAddress.user_id == user_id, UserAddress.address_id == address_id)
        .first()
    )
    if not mapping:
        return None

    addr = db.query(Address).filter(Address.id == address_id).first()
    if not addr:
        return None

    for key, val in payload.model_dump().items():
        setattr(addr, key, val)

    db.commit()
    return addr


def delete_address(db: Session, user_id: UUID, address_id: UUID) -> bool:
    """
    Clean deletes an address from the DB.
    If the deleted address was default, marks the next most recent address as default.
    """
    mapping = (
        db.query(UserAddress)
        .filter(UserAddress.user_id == user_id, UserAddress.address_id == address_id)
        .first()
    )
    if not mapping:
        return False

    addr = db.query(Address).filter(Address.id == address_id).first()
    was_default = mapping.is_default

    # 1. Delete mapping record first and flush to clear FK constraint
    db.delete(mapping)
    db.flush()

    # 2. Delete the actual address record safely
    if addr:
        db.delete(addr)
        db.flush()

    # If deleted default, fallback to next recent address
    if was_default:
        next_default = (
            db.query(UserAddress)
            .filter(UserAddress.user_id == user_id)
            .order_by(UserAddress.created_at.desc())
            .first()
        )
        if next_default:
            next_default.is_default = True
            db.flush()

    db.commit()
    return True
