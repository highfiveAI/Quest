# 폴더 구조

```
Quest/
├── backend/           # 백엔드 API 서버 (Node.js)
│   └── Dockerfile
├── frontend/          # 프론트엔드 (HTML, JS)
│   └── Dockerfile
├── db/                # DB 초기화 스크립트
│   └── init.sql
├── docker-compose.yml # 전체 서비스 오케스트레이션
└── README.md
```

## 설명
- **backend/**: 백엔드 API 서버 소스코드와 Dockerfile
- **frontend/**: 프론트엔드(HTML, JS) 소스코드와 Dockerfile
- **db/**: DB 초기화 SQL 스크립트
- **docker-compose.yml**: 모든 컨테이너(프론트, 백, DB) 정의 