# backend/Dockerfile
FROM node:20-bullseye

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Install NestJS CLI globally
RUN yarn global add @nestjs/cli

# Copy the rest of the application
COPY . .

# Build the application (optional, if you have a build step)
# RUN yarn build

# Expose the backend port
EXPOSE 3001

# Start the backend
CMD ["yarn", "start:prod"]  # Use 'start:prod' for production
