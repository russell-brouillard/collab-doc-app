FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project
COPY . .

# Expose the port for Next.js
EXPOSE 3000

# Set environment variables for development
ENV NODE_ENV=development

# Run the development server
CMD ["npm", "run", "dev"]