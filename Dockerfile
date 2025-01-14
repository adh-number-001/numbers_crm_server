# node-app/Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN yarn --frozen-lockfile
COPY . .

RUN yarn prisma:generate

EXPOSE 3000
CMD ["yarn", "start"]
