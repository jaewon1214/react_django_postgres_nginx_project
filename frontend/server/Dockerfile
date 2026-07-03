FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npx", "json-server", "--host", "0.0.0.0", "--watch", "db.json", "--port", "3001"]