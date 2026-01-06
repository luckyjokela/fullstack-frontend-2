FROM node:20-alpine

WORKDIR /app

ARG NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile && \
    pnpm rebuild @tailwindcss/oxide sharp

COPY public ./public
COPY src ./src
COPY next.config.ts ./
COPY postcss.config.mjs ./
COPY tsconfig.json ./

RUN echo "✅ NEXT_PUBLIC_SERVER_URL = $NEXT_PUBLIC_SERVER_URL"

ENV NEXT_LINT_WARNINGS=0

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]