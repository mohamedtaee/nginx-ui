FROM python:3.11.2-slim

WORKDIR /app

COPY . /app

RUN pip install --upgrade pip

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8080

ENV FLASK_APP=app
ENV FLASK_ENV=production

CMD ["gunicorn", "--workers", "1", "--timeout", "5000", "--preload", "--bind", "0.0.0.0:8080", "wsgi:app"]
