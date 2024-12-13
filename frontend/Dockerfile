FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN yarn

# Copy the entire project
COPY . .

# Expose the port for Next.js
EXPOSE 3000