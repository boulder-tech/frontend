# Usa la imagen oficial de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos de configuración y dependencias
COPY package*.json ./

# Instala react-scripts globalmente
RUN npm install -g react-scripts

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Exponer el puerto en el que se ejecutará tu aplicación React (por defecto es 80)
EXPOSE 3000

# Comando para ejecutar la aplicación (puede variar según la configuración de tu proyecto)
CMD npm run dev