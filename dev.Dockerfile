FROM node:16-alpine as base

WORKDIR /home/node/app

COPY package.json ./

COPY . .
RUN npm install

EXPOSE 3000