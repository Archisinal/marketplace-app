FROM node:latest

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY lerna.json .
COPY packages/indexer/ ./packages/indexer/
COPY packages/db ./packages/db/

ADD https://github.com/jwilder/dockerize/releases/download/v0.7.0/dockerize-linux-amd64-v0.7.0.tar.gz /usr/local/bin
RUN tar -C /usr/local/bin -xzvf /usr/local/bin/dockerize-linux-amd64-v0.7.0.tar.gz

RUN yarn

EXPOSE 3020

WORKDIR /app/packages/indexer

RUN chmod +x ./start.sh