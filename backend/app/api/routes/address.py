from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user
from app.models.user import User
from app.schemas.address import AddressCreate, AddressUpdate, AddressResponse
from app.services.address_service import (
    get_user_addresses,
    create_address,
    update_address,
    delete_address,
)

router = APIRouter(
    prefix="/addresses",
    tags=["Shipping Addresses"],
)


@router.get(
    "",
    response_model=list[AddressResponse],
)
def fetch_addresses(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Returns all shipping addresses saved for the current user.
    """
    return get_user_addresses(db, current_user.id)


@router.post(
    "",
    response_model=AddressResponse,
)
def add_address(
    payload: AddressCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Adds a new shipping address. Automatically sets it as the default address.
    """
    addr = create_address(db, current_user.id, payload)
    return AddressResponse(
        id=addr.id,
        consignee_name=addr.consignee_name,
        phone_number=addr.phone_number,
        secondary_phone_number=addr.secondary_phone_number,
        address_type=addr.address_type,
        address_line_1=addr.address_line_1,
        address_line_2=addr.address_line_2,
        city=addr.city,
        state=addr.state,
        pincode=addr.pincode,
        is_default=True,
    )


@router.put(
    "/{address_id}",
    response_model=AddressResponse,
)
def modify_address(
    address_id: UUID,
    payload: AddressUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Edits details of an existing shipping address.
    """
    addr = update_address(db, current_user.id, address_id, payload)
    if not addr:
        raise HTTPException(
            status_code=404,
            detail="Address not found or unauthorized to modify.",
        )
    
    # Check default status mapping
    from app.models.user_address import UserAddress
    mapping = db.query(UserAddress).filter(UserAddress.address_id == address_id).first()
    is_default = mapping.is_default if mapping else False

    return AddressResponse(
        id=addr.id,
        consignee_name=addr.consignee_name,
        phone_number=addr.phone_number,
        secondary_phone_number=addr.secondary_phone_number,
        address_type=addr.address_type,
        address_line_1=addr.address_line_1,
        address_line_2=addr.address_line_2,
        city=addr.city,
        state=addr.state,
        pincode=addr.pincode,
        is_default=is_default,
    )


@router.delete(
    "/{address_id}",
)
def remove_address(
    address_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Deletes a shipping address from the user's list.
    """
    success = delete_address(db, current_user.id, address_id)
    if not success:
        raise HTTPException(
            status_code=404,
            detail="Address not found or unauthorized to delete.",
        )
    return {"success": True, "message": "Address deleted successfully."}
