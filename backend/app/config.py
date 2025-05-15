import os
from pydantic import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "LinkedIn Post Generator"
    LINKEDIN_CLIENT_ID: str
    LINKEDIN_CLIENT_SECRET: str
    LINKEDIN_REDIRECT_URI: str

    # IA
    OPENAI_API_KEY: str

    class Config:
        env_file = ".env"


settings = Settings()
