
from fastapi import APIRouter
from app.integrations.nimbus_post.client import NimbusPostClient

router = APIRouter()


@router.get("/authenticate")
async def test_nimbus_authentication():

    client = NimbusPostClient()

    response = await client.authenticate()

    return response