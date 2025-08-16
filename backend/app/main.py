from fastapi import FastAPI
from app.api import router as api_router

app = FastAPI(
    title="Fake News Detector LATAM",
    version="0.1.0",
)

app.include_router(api_router)
