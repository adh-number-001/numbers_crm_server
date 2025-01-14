### Prisma 사용법
1. `yarn prisma:push:local` 명령을 실행시켜 로컬 개발 환경에서 schema 를 로컬 DB 에 반영하여 개발 
2. 초기에는 `yarn prisma:migration:init` 명령을 실행시켜 마이그레이션 파일을 생성하고 development 데이터베이스에 반영
3. 이후 Schema 변경 시에는 `prisma:migrate:dev` -> `prisma:migrate:deploy` 순서로 실행
    - `prisma:migrate:dev`: development 환경에 변경된 schema 에 대한 migration 적용
    - `prisma:migrate:deploy`: prod 환경에 변경된 schema 에 대한 migration 적용

### 디렉토리 구조
```text
-- environment: 환경 변수 관련 파일
-- src
    |-- common: dto, exception, util 등 공용 함수, 클래스
    |-- config: 서버 실행을 위한 환경설정
    |-- library: prisma, aws 등의 서드파티 라이브러리
    |-- 기타 도메인 관련 모듈들 
-- prisma: prisma schema, migration 관련 파일
```
