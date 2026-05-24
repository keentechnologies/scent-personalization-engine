from fastapi import FastAPI

from app.api.routes.health import router as health_router
from app.api.routes.redis_test import router as redis_router
from app.api.routes.jwt_test import router as jwt_router
from app.api.routes.msg91_test import router as msg91_router
from fastapi.staticfiles import StaticFiles
from app.api.routes.auth import router as auth_router
from app.api.routes.sensitivity_filter import router as sensitivity_filter_router
from app.api.routes.gender_score_table import router as gender_score_table_router
from app.api.routes.sessions import router as sessions_router



app = FastAPI()


app.include_router(health_router)
app.include_router(redis_router)
app.include_router(jwt_router)
app.include_router(msg91_router)
app.include_router(auth_router)
app.include_router(sensitivity_filter_router)
app.include_router(gender_score_table_router)
app.include_router(sessions_router)

app.mount(
    "/static",
    StaticFiles(directory="app/static"),
    name="static"
)
