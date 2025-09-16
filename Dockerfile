# Usar Node.js
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

# Vite usa "npm run dev"
CMD ["npm", "run", "dev", "--", "--host"]
