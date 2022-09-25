FROM node:18-alpine as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn run build

FROM caddy:2-alpine
COPY ./caddy/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/build /usr/share/caddy