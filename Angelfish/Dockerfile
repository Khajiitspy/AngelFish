# Stage 1: Build Angular app
FROM node:20-alpine AS build
WORKDIR /girl-web

# Копіюємо package.json та package-lock.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm i

# Копіюємо всі файли
COPY . .

# Збираємо Angular додаток у production mode
RUN npm run build -- --configuration production

# Stage 2: Run with Nginx
FROM nginx:stable-alpine3.21-perl

# Видаляємо дефолтний конфіг nginx
RUN rm /etc/nginx/conf.d/default.conf

# Копіюємо свій конфіг
COPY nginx.conf /etc/nginx/conf.d

# Копіюємо збірку Angular у корінь nginx
COPY --from=build /girl-web/dist/AngelFish/browser /usr/share/nginx/atb-web

# Відкриваємо порт
EXPOSE 80

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]
