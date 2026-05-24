import httpx

from app.core.config import settings


VERIFY_ACCESS_TOKEN_URL = (
    "https://control.msg91.com/api/v5/widget/verifyAccessToken"
)


async def verify_msg91_access_token(access_token: str):

    payload = {
        "authkey": settings.MSG91_AUTH_KEY,
        "access-token": access_token
    }

    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

    async with httpx.AsyncClient() as client:

        response = await client.post(
            VERIFY_ACCESS_TOKEN_URL,
            json=payload,
            headers=headers
        )

    if response.status_code != 200:

        return None

    return response.json()