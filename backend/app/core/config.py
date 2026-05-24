import os

from dotenv import load_dotenv

load_dotenv()


class Settings:

    DATABASE_URL = os.getenv("DATABASE_URL")

    REDIS_URL = os.getenv("REDIS_URL")

    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")
    JWT_ACCESS_TOKEN_EXPIRE_DAYS = int(
        os.getenv("JWT_ACCESS_TOKEN_EXPIRE_DAYS", 7)
    )
    MSG91_AUTH_KEY = os.getenv("MSG91_AUTH_KEY")


settings = Settings()