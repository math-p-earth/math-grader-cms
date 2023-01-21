FROM node:19-alpine as builder

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build


FROM node:19-alpine as runtime

WORKDIR /app

ENV NODE_ENV=production

COPY ["package.json", "yarn.lock", "./"]

RUN yarn --frozen-lockfile --prod

COPY --from=build /app/dist ./dist
COPY --from=build /app/build ./build

CMD ["yarn", "serve"]
