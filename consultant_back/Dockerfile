FROM python:3.12.0-alpine3.17
#FROM python:3.4
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# RUN apt-get update \
# 	&& apt-get install -y --no-install-recommends \
# 		postgresql-client \
# 	&& rm -rf /var/lib/apt/lists/*

# RUN pip install --no-cache-dir -r requirements.txt


WORKDIR /app
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . .

#EXPOSE 8000
#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]