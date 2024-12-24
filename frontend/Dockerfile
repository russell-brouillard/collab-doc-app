# frontend/Dockerfile
FROM node:20-bullseye-slim

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Build the Next.js application
RUN yarn build

# Expose the frontend port
EXPOSE 3000

# Start the frontend
CMD ["yarn", "start"]  # Use 'start' for production
