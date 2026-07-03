#FROM node:20-alpine

#WORKDIR /app

#COPY package*.json ./

#RUN npm install

#COPY . .

#EXPOSE 3001

#CMD ["npx", "json-server", "--host", "0.0.0.0", "--watch", "db.json", "--port", "3001"]


FROM python:3.12-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirment.txt .

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirment.txt

COPY . .

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]