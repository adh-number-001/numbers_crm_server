#!/bin/bash

# deploy.sh

# 도커 애플리케이션 이름과 레포지토리 설정
DOCKER_APP="node-app"
# DOCKER_REPO="your-docker-repo"   # 실제 도커 레포지토리 주소로 변경 필요
TAG=$(date +%Y%m%d-%H%M%S)       # 현재 시간을 태그로 사용하여 버전 관리

# 현재 실행중인 blue 컨테이너가 있는지 확인
# docker ps로 실행중인 컨테이너 목록에서 blue라는 이름을 가진 컨테이너를 찾음
CURRENT_CONTAINER=$(docker ps --filter "name=blue" --format "{{.Names}}" | grep blue)

# blue 컨테이너가 실행중이면 green으로 배포, 아니면 blue로 배포
if [ -n "$CURRENT_CONTAINER" ]; then    # -n은 문자열 길이가 0이 아닌지 체크
   NEW_COLOR="green"    # blue가 실행중이면 green으로 새로 배포
   OLD_COLOR="blue"     # 현재 실행중인 blue는 이전 버전이 됨
else
   NEW_COLOR="blue"     # blue가 없으면 blue로 새로 배포
   OLD_COLOR="green"    # 현재 실행중인 green은 이전 버전이 됨
fi

echo "Deploying to $NEW_COLOR"

# 새로운 도커 이미지 빌드
# -t 옵션으로 태그 지정, ./node-app 디렉토리의 Dockerfile 사용
# docker build -t $DOCKER_REPO/$DOCKER_APP:$TAG ./node-app
docker build -t node-app:$TAG ./node-app #테스트용 이미지
# docker-compose를 사용하여 새 버전 컨테이너 실행
# --no-deps: 의존성 컨테이너는 재시작하지 않음
# --build: 컨테이너 시작 전 이미지를 다시 빌드
docker-compose up -d --no-deps --build $NEW_COLOR

# 새로 실행된 컨테이너가 정상적으로 동작하는지 확인
echo "Health check..."
sleep 10    # 컨테이너가 완전히 시작되기를 기다림

# curl로 health check 엔드포인트 호출하여 새 버전이 정상 동작하는지 확인
if curl -s http://$NEW_COLOR:3000/health; then
   # 정상 동작하면 nginx 재시작하여 트래픽을 새 버전으로 전환
   docker-compose restart nginx
   
   # 이전 버전 컨테이너 중지
   docker-compose stop $OLD_COLOR
   
   echo "Deployment successful!"
else
   # health check 실패시 새 버전 컨테이너 중지하고 배포 실패 처리
   echo "Deployment failed!"
   docker-compose stop $NEW_COLOR
   exit 1    # 스크립트 종료 및 에러 상태 반환
fi
