# app/models.py
from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime

class NewsBase(BaseModel):
    title: str
    text: str

class NewsPrediction(NewsBase):
    id: str
    prediction: str
    confidence: Optional[float] = None  # Confidence score can be optional
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True