from fastapi import APIRouter
from fastapi import HTTPException

from app.schemas.pincode_schema import (
    PincodeCheckRequest,
    PincodeCheckResponse,
)

from app.services.pincode_service import (
    check_pincode_delivery,
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