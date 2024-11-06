FROM node:20-alpine AS build

WORKDIR /app

COPY package.json .

RUN npm install

COPY tsconfig* ./
COPY angular.json .
COPY src src

RUN npm run build

FROM nginx:mainline-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/itmo-is-lab1-client /usr/share/nginx/html
