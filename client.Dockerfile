FROM node:18-alpine

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY lerna.json .
COPY packages/client ./packages/client/
COPY packages/backend ./packages/backend/

RUN yarn

WORKDIR /app/packages/client

ENV NODE_ENV production
RUN yarn build

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["yarn", "start"]