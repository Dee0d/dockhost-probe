# ---------- Этап 1: сборка фронтенда ----------
FROM node:22-alpine AS build

WORKDIR /app

# Сначала только манифесты — чтобы слой с зависимостями кешировался
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Потом исходники
COPY . .
RUN npm run build

# ---------- Этап 2: раздача статики через nginx ----------
FROM nginx:1.27-alpine

# Конфиг nginx (SPA-роутинг + gzip + /healthz)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Собранные файлы
COPY --from=build /app/dist /usr/share/nginx/html

# Dockhost пробрасывает трафик на открытый порт контейнера
EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://127.0.0.1/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
