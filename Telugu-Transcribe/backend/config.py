import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # PostgreSQL connection
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "postgresql://postgres:password@localhost:5432/telugu_transcribe"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key")
    HUGGINGFACE_TOKEN = os.getenv("HUGGINGFACE_TOKEN", "")
