import random
from typing import Tuple

def predict_fake_news(title: str, text: str) -> Tuple[str, float]:
    full_text = f"{title}\n{text}"
    # Simulate prediction logic
    fake = "!" in text or "URGENTE" in full_text.upper()
    confidence = round(random.uniform(0.6, 0.99), 2)

    return ("fake" if fake else "real", confidence)
