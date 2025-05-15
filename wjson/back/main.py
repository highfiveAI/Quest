from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import counter

app = FastAPI()

# CORS 설정 (React 연결 위해)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(counter.router)