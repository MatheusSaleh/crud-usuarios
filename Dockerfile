# 1. Build da aplicação
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Servir com Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Copiar um arquivo de configuração customizado, se quiser
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
