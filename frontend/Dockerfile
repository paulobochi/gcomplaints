FROM node:8.16.0-alpine

RUN mkdir -p /app
WORKDIR /app

RUN npm install -g serve

COPY package.json  yarn.lock /app/
COPY . /app/

RUN yarn install
RUN npm run build --production