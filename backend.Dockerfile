FROM node:latest

WORKDIR /app

COPY package.json .
COPY lerna.json .
COPY packages/backend/ ./packages/backend/
COPY packages/db ./packages/db/

RUN yarn

EXPOSE 3001

WORKDIR /app/packages/backend

RUN chmod +x ./start.sh

CMD [ "./start.sh" ]