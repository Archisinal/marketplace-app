FROM node:latest

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY lerna.json .
COPY packages/indexer/ ./packages/indexer/
COPY packages/db ./packages/db/

RUN yarn

EXPOSE 3020

WORKDIR /app/packages/indexer

CMD [ "yarn", "start" ]