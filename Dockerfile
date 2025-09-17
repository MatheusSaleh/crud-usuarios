# Usar Node.js
FROM node:20-alpine

# =========================================================
# >> INÍCIO: Comandos para instalar o dockerize
# =========================================================
# Instala dependências necessárias (wget) e o dockerize
ENV DOCKERIZE_VERSION v0.7.0
RUN apk add --no-cache wget openssl && \
    wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz && \
    tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz && \
    rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz
# =========================================================
# >> FIM: Comandos para instalar o dockerize
# =========================================================

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

# A linha CMD foi removida daqui porque agora será definida no docker-compose.yml
# CMD ["npm", "run", "dev", "--", "--host"]