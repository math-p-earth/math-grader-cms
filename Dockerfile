FROM node:19-alpine as build

WORKDIR /app

RUN yarn global add pnpm

COPY ["package.json", "pnpm-lock.yaml", "./"]

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build


FROM node:19-alpine

WORKDIR /app

RUN yarn global add pnpm
ENV NODE_ENV=production

COPY ["package.json", "pnpm-lock.yaml", "./"]

RUN pnpm install --frozen-lockfile --prod

COPY --from=build /app/dist ./dist
COPY --from=build /app/build ./build

CMD ["pnpm", "serve"]
