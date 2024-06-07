FROM node:20-alpine

RUN apk add --no-cache curl

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
 CMD curl -f http://localhost:3000/health || exit 1

CMD ["sh", "run-prod.sh"]