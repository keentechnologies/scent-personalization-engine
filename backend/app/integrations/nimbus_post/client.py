import os

import httpx


class NimbusPostClient:

    def __init__(self):

        self.base_url = "https://api.nimbuspost.com/v1"

        self.email = os.getenv("NIMBUS_EMAIL")

        self.password = os.getenv("NIMBUS_PASSWORD")

        self.token = None

    async def authenticate(self):

        url = f"{self.base_url}/users/login"

        payload = {
            "email": self.email,
            "password": self.password,
        }

        async with httpx.AsyncClient() as client:

            response = await client.post(
                url,
                json=payload,
                timeout=30.0,
            )

        response.raise_for_status()

        data = response.json()

        token = data.get("data")

        if not token:
            raise Exception(
                "NimbusPost authentication failed",
            )

        self.token = token

        return {
            "success": True,
            "token": self.token,
        }

    async def check_serviceability(
        self,
        pincode: str,
    ):

        if not self.token:
            await self.authenticate()

        url = (
            f"{self.base_url}/courier/serviceability"
        )

        headers = {
            "Authorization": f"Bearer {self.token}",
            "Content-Type": "application/json",
        }

        payload = {
            "origin": "560001",
            "destination": pincode,
            "payment_type": "prepaid",
            "weight": 500,
            "length": 10,
            "breadth": 10,
            "height": 10,
        }

        async with httpx.AsyncClient() as client:

            response = await client.post(
                url,
                json=payload,
                headers=headers,
                timeout=30.0,
            )

        response.raise_for_status()

        data = response.json()

        return data