FROM node:18-alpine
# SSL 라이브러리 및 필요한 시스템 패키지 추가
RUN apk add --no-cache openssl libssl1.1 libc6-compat

WORKDIR /app

# 패키지 파일 복사
COPY package*.json ./
COPY yarn.lock ./

# 의존성 설치 및 Prisma 생성
RUN yarn install --frozen-lockfile \
    && yarn prisma generate

# 애플리케이션 코드 복사
COPY . .

# 빌드 수행
RUN yarn build

EXPOSE 3000

# 프로덕션 시작 명령어
CMD ["yarn", "start:prod"]
