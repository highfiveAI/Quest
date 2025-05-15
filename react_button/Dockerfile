# stage 1: REACT-APP 빌드 (nodejs)
FROM node:22 AS build

WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm install

# 소스 카피
COPY . .

# production 빌드 생성
RUN npm run build

# stage 2: REACT APP Service (nginx)
FROM nginx:alpine

# 빌드 결과 복사 (build 또는 dist 경로 확인)
# 기본 경로: build
# COPY --from=build /app/build /usr/share/nginx/html
# 대체 경로: dist (build 경로가 없는 경우)
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
