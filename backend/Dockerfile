FROM node:18-alpine

# Crear directorio de la aplicación
WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código de la aplicación
COPY . .

# Exponer el puerto de la aplicación
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["npm", "start"]