from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.schemas.pincode_schema import (
    PincodeCheckRequest,
    PincodeCheckResponse,
    PincodeLookupResponse,
)

from app.services.pincode_service import (
    check_pincode_delivery,
    lookup_pincode_city_state,
)

router = APIRouter()


@router.post(
    "/check-free-delivery",
    response_model=PincodeCheckResponse,
)
async def check_free_delivery(
    payload: PincodeCheckRequest,
):

    try:

        response = await check_pincode_delivery(
            pincode=payload.pincode,
        )

        return response

    except ValueError as error:

        raise HTTPException(
            status_code=400,
            detail=str(error),
        )


@router.get(
    "/pincode-lookup/{pincode}",
    response_model=PincodeLookupResponse,
)
def pincode_lookup(
    pincode: str,
    db: Session = Depends(get_db),
):
    result = lookup_pincode_city_state(db=db, pincode=pincode)
    if not result:
        raise HTTPException(
            status_code=404,
            detail="Pincode mapping not found",
        )
    return result