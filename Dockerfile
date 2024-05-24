FROM python:3.11.2-slim

EXPOSE 8080

WORKDIR /app

RUN pip install --upgrade pip
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

CMD ["gunicorn", "--workers", "2", "--timeoute", "5000", "--preload", "--bind", "0.0.0.0:8080", "app:app"]
