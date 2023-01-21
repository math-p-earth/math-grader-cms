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

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/build ./build

CMD ["yarn", "serve"]
