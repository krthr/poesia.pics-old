FROM node:18-alpine AS base

WORKDIR /build
COPY . .

RUN npm ci
RUN npm run build

CMD node .output/server/index.mjs