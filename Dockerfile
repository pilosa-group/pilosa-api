FROM node:20-alpine

RUN apk add --no-cache curl

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm run typeorm -- migration:run

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
 CMD curl -f http://localhost:3000/health || exit 1


CMD ["npm", "run", "start"]