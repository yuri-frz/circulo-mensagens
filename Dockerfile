FROM node:22-bookworm-slim AS base
WORKDIR /app
COPY package.json package-lock.json ./
COPY src ./src

FROM base AS api
COPY server ./server
ENV HOST=0.0.0.0 PORT=3001 CIRCULO_DATA_FILE=/data/circulo.sqlite
CMD ["node", "server/index.mjs"]

FROM base AS web
RUN npm ci --legacy-peer-deps --no-audit --no-fund
COPY App.js app.json ./
ENV EXPO_NO_TELEMETRY=1
CMD ["npm", "run", "web", "--", "--lan", "--port", "8081"]
