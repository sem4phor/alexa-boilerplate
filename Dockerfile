FROM node:8.10-alpine

ENV NODE_ENV=development

RUN apk add --no-cache bash
RUN npm i -g ask-cli
RUN npm i -g parcel
RUN npm i -g bespoken-tools

WORKDIR /skill/lambda
COPY lambda/package*.json ./
RUN npm install
WORKDIR /skill
COPY . .
RUN chmod u+x hooks/*.sh

EXPOSE 8080

CMD parcel watch lambda/index.ts --target node --out-dir lambda/parcel
