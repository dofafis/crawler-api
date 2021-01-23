FROM node:10.16.0-alpine as build

WORKDIR /crawler-api

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:8.9.4-alpine as run
COPY --from=build /crawler-api/build .
COPY --from=build /crawler-api/node_modules ./node_modules
CMD node index.js