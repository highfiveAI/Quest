from fastapi import FastAPI, HTTPException
from sqlalchemy import create_engine, Column, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import random
import os

app = FastAPI()

# MySQL 연결 정보 (docker-compose에서 환경변수로 설정 예정)
MYSQL_USER = os.getenv("MYSQL_USER", "root")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD", "password")
MYSQL_HOST = os.getenv("MYSQL_HOST", "db")
MYSQL_DB = os.getenv("MYSQL_DB", "numbers_db")

DATABASE_URL = f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:3306/{MYSQL_DB}"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Number(Base):
    __tablename__ = "numbers"
    id = Column(Integer, primary_key=True, index=True)
    value = Column(Integer, nullable=False)

# DB 테이블 생성
Base.metadata.create_all(bind=engine)

@app.post("/generate")
def generate_number():
    db = SessionLocal()
    try:
        value = random.randint(1, 100)
        number = Number(value=value)
        db.add(number)
        db.commit()
        db.refresh(number)
        return {"id": number.id, "value": number.value}
    finally:
        db.close()

@app.get("/numbers")
def get_numbers():
    db = SessionLocal()
    try:
        numbers = db.query(Number).all()
        return [{"id": n.id, "value": n.value} for n in numbers]
    finally:
        db.close() 