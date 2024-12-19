FROM node:20-bullseye-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN yarn

RUN yarn add next

# Copy the entire project
COPY . .

# Expose the port for Next.js
EXPOSE 3000