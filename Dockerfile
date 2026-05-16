# https://create.t3.gg/en/deployment/docker

# =========================================================
# Dependencies
# =========================================================

FROM --platform=linux/amd64 node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm config set dangerouslyAllowAllBuilds true
RUN pnpm install --frozen-lockfile


# =========================================================
# Builder
# =========================================================

FROM --platform=linux/amd64 node:22-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app


COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV SKIP_ENV_VALIDATION=1

RUN npm install -g pnpm
RUN pnpm config set dangerouslyAllowAllBuilds true
RUN pnpm run build


# =========================================================
# Runner
# =========================================================

FROM gcr.io/distroless/nodejs22-debian12 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["server.js"]
