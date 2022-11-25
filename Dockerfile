ARG NODE_VERSION=node:16.18.1

FROM $NODE_VERSION AS dependency-base

# install package manager
RUN npm install -g pnpm

# create destination directory
RUN mkdir -p /app
WORKDIR /app

# copy the app, note .dockerignore
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install --shamefully-hoist --frozen-lockfile

FROM dependency-base AS production-base

# build will also take care of building
# if necessary
COPY . .
RUN pnpm run build

FROM $NODE_VERSION-slim AS production

COPY --from=production-base /app/.output /app/.output

# Service hostname
ENV NUXT_HOST=0.0.0.0

# Service version
ARG NUXT_APP_VERSION
ENV NUXT_APP_VERSION=${NUXT_APP_VERSION}

# Run in production mode
ENV NODE_ENV=production

# start the app
CMD [ "node", "/app/.output/server/index.mjs" ]
