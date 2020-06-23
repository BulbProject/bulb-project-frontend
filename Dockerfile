FROM node:lts-slim as builder

ARG APP_PORT
ARG NODE_ENV

WORKDIR /usr/src/bulb-project-frontend

COPY package.json tsconfig.json webpack.common.js webpack.prod.js .babelrc.js .eslintrc.json yarn.lock ./
COPY src/ ./src
COPY public/ ./public

RUN yarn --production && yarn cache clean --force && yarn build

FROM nginx:alpine

COPY --from=builder /usr/src/bulb-project-frontend/build/ /usr/share/nginx/html

COPY nginx.conf.template /etc/nginx/

EXPOSE $APP_PORT

# Elven spell
CMD ["/bin/sh", "-c", "envsubst \"`env | awk -F = '{printf \" \\\\$%s\", $1}'`\" < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]
