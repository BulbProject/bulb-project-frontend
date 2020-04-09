FROM node:lts-slim

ARG APP_PORT

ENV NODE_ENV=production

WORKDIR /usr/src/bulb-project-frontend

COPY ./ ./

RUN yarn --production && yarn cache clean --force && yarn build

EXPOSE $APP_PORT

CMD ["yarn", "start"]
