FROM node:18-alpine
# 필요한 시스템 라이브러리 설치
RUN apk add --no-cache openssl gcompat
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
# 의존성 설치 및 캐시 정리
RUN yarn install --frozen-lockfile && yarn cache clean
# 소스 코드 복사
COPY . .
# Prisma 클라이언트 생성
RUN yarn prisma generate

EXPOSE 3000
CMD ["yarn", "start:prod"]
