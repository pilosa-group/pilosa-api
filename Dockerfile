FROM node:20

RUN apt-get update && apt-get install -y curl

WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npx playwright install --with-deps chromium

COPY . .
RUN npm run build

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
 CMD curl -f http://localhost:4000/v1/health || exit 1

CMD ["sh", "./run-prod.sh"]