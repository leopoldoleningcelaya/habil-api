# Common build stage
FROM node:18.10-alpine as common-build-stage

COPY . ./app

WORKDIR /app

ARG PORT

RUN npm install -g npm@9.8.1

RUN npm ci

EXPOSE $PORT

CMD ["npm", "run", "start"]
