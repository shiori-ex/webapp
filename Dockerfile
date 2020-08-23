FROM node:alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ----------------------------------------------------------

FROM nginx:mainline-alpine AS final
LABEL maintainer="zekro <contact@zekro.de>"

WORKDIR /app
COPY --from=build /app/build .
COPY config/nginx.conf /etc/nginx/conf.d/shiori.conf

EXPOSE 8080