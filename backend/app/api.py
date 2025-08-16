from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
async def health_check():
    return {"status": "ok"}

@router.post("/predict")
async def predict_news(news: dict):
    # TODO: add model logic
    return {"fake": False, "confidence": 0.99}
