FROM node:14

ENV NODE_ENV=production

WORKDIR /app

COPY ./package.json .

RUN npm i

COPY . .

EXPOSE "50051"