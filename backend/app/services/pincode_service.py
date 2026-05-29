

from app.integrations.nimbus_post.client import (
    NimbusPostClient,
)


async def check_pincode_delivery(
    pincode: str,
):

    if not pincode.isdigit():
        raise ValueError(
            "Pincode must contain only digits",
        )

    if len(pincode) != 6:
        raise ValueError(
            "Pincode must be exactly 6 digits",
        )

    client = NimbusPostClient()

    response = await client.check_serviceability(
        pincode=pincode,
    )

    status = response.get("status")

    courier_options = response.get("data", [])

    if not status or not courier_options:
        return {
            "success": True,
            "free_delivery": False,
        }

    cheapest_option = min(
        courier_options,
        key=lambda option: option.get(
            "total_charges",
            float("inf"),
        ),
    )

    cheapest_charge = cheapest_option.get(
        "total_charges",
        0,
    )

    free_delivery = cheapest_charge < 100

    return {
        "success": True,
        "free_delivery": free_delivery,
    }