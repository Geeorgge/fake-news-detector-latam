import traceback
from bson import ObjectId
from datetime import datetime
from app.db import news_collection
from fastapi import APIRouter, HTTPException
from app.services.predictor import predict_fake_news
from app.models import NewsBase, NewsPrediction

router = APIRouter()

@router.post("/predict", response_model=NewsPrediction)
async def predict(news: NewsBase):
    try:
        title = news.title
        text = news.text

        prediction, probability = predict_fake_news(title, text)
        confidence = round(probability * 100, 2)

        result_doc = {
            "title": title,
            "text": text,
            "prediction": prediction,
            "confidence": confidence,
            "created_at": datetime.utcnow()
        }

        inserted = await news_collection.insert_one(result_doc)
        result_doc["id"] = str(inserted.inserted_id)

        return result_doc

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/news", response_model=NewsPrediction)
async def create_news(news: NewsBase):
    title = news.title
    text = news.text
    prediction, probability = predict_fake_news(title, text)
    confidence = round(probability * 100, 2)

    result_doc = {
        "title": title,
        "text": text,
        "prediction": prediction,
        "confidence": confidence,
        "created_at": datetime.utcnow()
    }

    inserted = await news_collection.insert_one(result_doc)
    result_doc["id"] = str(inserted.inserted_id)

    return result_doc


@router.get("/news", response_model=list[NewsPrediction])
async def get_news():
    try:
        cursor = news_collection.find().sort("created_at", -1)
        news_list = []
        async for item in cursor:
            item["id"] = str(item["_id"])
            news_list.append(item)
        return news_list
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/news/{id}", response_model=NewsPrediction)
async def get_news_by_id(id: str):
    try:
        oid = ObjectId(id)  # safe conversion
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid ObjectId format")

    result = await news_collection.find_one({"_id": oid})
    if not result:
        raise HTTPException(status_code=404, detail="News not found")

    # turn _id → id string for frontend
    result["id"] = str(result["_id"])
    del result["_id"]

    return NewsPrediction(**result)


@router.delete("/news/{id}")
async def delete_news_by_id(id: str):
    try:
        oid = ObjectId(id)  # safe conversion
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid ObjectId format")

    result = await news_collection.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="News not found")

    return {"message": "News deleted"}


@router.get("/stats")
async def get_statistics():
    try:
        total = await news_collection.count_documents({})
        real_count = await news_collection.count_documents({"prediction": "real"})
        fake_count = await news_collection.count_documents({"prediction": "fake"})

        pipeline = [
            {
                "$group": {
                    "_id": None,
                    "avg_confidence": {"$avg": "$confidence"},
                    "last_prediction": {"$max": "$created_at"}
                }
            }
        ]
        agg_cursor = news_collection.aggregate(pipeline)
        agg_result = [doc async for doc in agg_cursor]

        if agg_result:
            stats = agg_result[0]
            return {
                "total": total,
                "real": real_count,
                "fake": fake_count,
                "avg_confidence": round(stats["avg_confidence"], 3),
                "last_prediction": stats["last_prediction"]
            }
        else:
            return {
                "total": 0,
                "real": 0,
                "fake": 0,
                "avg_confidence": 0.0,
                "last_prediction": None
            }

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
