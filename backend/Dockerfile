FROM node:20-bullseye

WORKDIR /app
COPY package*.json ./
RUN yarn install
RUN yarn global add @nestjs/cli
COPY . .

EXPOSE 3001
CMD ["yarn", "start:dev"]