FROM node:18-alpine AS development
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED 1
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1
COPY --from=development /app/package*.json ./
COPY --from=development /app/.next ./.next
COPY --from=development /app/public ./public
COPY --from=development /app/prisma ./prisma
COPY --from=development /app/node_modules ./node_modules
COPY --from=development /app/next.config.ts ./

EXPOSE 3000
CMD ["npm", "start"]
