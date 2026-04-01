FROM node:22-alpine AS base
WORKDIR /app
ARG SITE_URL=https://clock.arthurp.fr
ARG CONTACT_URL=https://contact.arthurp.fr
ARG CONTACT_EMAIL=contact@arthurp.fr
ENV SITE_URL=${SITE_URL}
ENV CONTACT_URL=${CONTACT_URL}
ENV CONTACT_EMAIL=${CONTACT_EMAIL}
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS dev
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0", "--port", "3000"]

FROM deps AS builder
COPY . .
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]