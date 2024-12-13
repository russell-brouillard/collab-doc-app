FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install all dependencies (including devDependencies)
COPY package*.json ./
RUN npm install

RUN npm i -g @nestjs/cli

# Copy the rest of the application code (This will be overwritten by the volume in dev mode, but ensures node_modules are present)
COPY . .

# Expose Nest's default port
EXPOSE 3000

# The command will be overridden by docker-compose with `npm run start:dev`
