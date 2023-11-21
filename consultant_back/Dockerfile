FROM python:3.12.0-alpine3.17
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1


WORKDIR /app
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . .
