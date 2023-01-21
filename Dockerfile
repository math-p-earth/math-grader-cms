FROM node:19-alpine as builder

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install --frozen-lockfile

COPY src ./src
COPY tsconfig.json ./

RUN yarn build

CMD ["yarn", "serve"]
