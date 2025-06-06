

# image Node.js
FROM node:18-alpine


WORKDIR /app

# Copie de package.json et package-lock.json

COPY package*.json ./

# Installe dépendances
RUN npm install

# Copie le reste du code source
COPY . .

# Expose port 
EXPOSE 3000

# exécute l'appli
CMD ["node", "server.js"]