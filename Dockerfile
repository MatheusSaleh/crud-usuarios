# Base Node Debian para evitar problemas de binários nativos
FROM node:20-bullseye

WORKDIR /usr/src/app

# Instalar wget, tar e curl para dockerize
RUN apt-get update && apt-get install -y wget tar curl && rm -rf /var/lib/apt/lists/*

# Instalar dockerize
ENV DOCKERIZE_VERSION v0.7.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz && \
    tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz && \
    chmod +x /usr/local/bin/dockerize && \
    rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Copiar package.json e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar o restante do projeto
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
