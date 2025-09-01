# Multi-stage Dockerfile for Nuxt 3 portfolio
FROM node:22.19.0-slim AS base

# Set working directory
WORKDIR /app

# Install system dependencies and enable corepack
RUN apt-get update && apt-get install -y \
    wget \
    python3 \
    make \
    g++ \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && corepack enable \
    && corepack prepare pnpm@latest --activate

# Dependencies stage
FROM base AS deps
# Copy package files
COPY package.json pnpm-lock.yaml ./
# Install dependencies
RUN pnpm install --frozen-lockfile --shamefully-hoist

# Build stage
FROM base AS builder
# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
# Copy source code
COPY . .
# Build the application
RUN pnpm run build

# Runtime stage
FROM node:22.19.0-slim AS runtime
WORKDIR /app

# Install only runtime dependencies
RUN apt-get update && apt-get install -y wget \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN groupadd --system --gid 1001 nodejs \
    && useradd --system --uid 1001 --gid nodejs nuxtjs

# Copy built application
COPY --from=builder --chown=nuxtjs:nodejs /app/.output /app/.output

# Set environment variables
ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:3000 || exit 1

# Switch to non-root user
USER nuxtjs

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "/app/.output/server/index.mjs"]