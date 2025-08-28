FROM python:3.11-slim

WORKDIR /app

COPY . /app

# Set PYTHONPATH to include the app directory
ENV PYTHONPATH=/app

RUN pip install --no-cache-dir -r requirements.txt

# Install FastAPI and Uvicorn
RUN pip install fastapi uvicorn

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
