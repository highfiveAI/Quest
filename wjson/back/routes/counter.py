from fastapi import APIRouter
import mysql.connector

router = APIRouter()

def get_db_connection():
    return mysql.connector.connect(
        host="db",
        user="user",
        password="pass",
        database="counter_db"
    )

@router.get("/counter")
def read_counter():
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS counter (id INT PRIMARY KEY, value INT)")
    cursor.execute("SELECT value FROM counter WHERE id = 1")
    row = cursor.fetchone()
    if not row:
        cursor.execute("INSERT INTO counter (id, value) VALUES (1, 0)")
        db.commit()
        value = 0
    else:
        value = row[0]
    db.close()
    return {"value": value}

@router.post("/counter/increment")
def increment_counter():
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("UPDATE counter SET value = value + 1 WHERE id = 1")
    db.commit()
    db.close()
    return {"message": "incremented"}

@router.post("/counter/decrement")
def decrement_counter():
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("UPDATE counter SET value = value - 1 WHERE id = 1")
    db.commit()
    db.close()
    return {"message": "decremented"}
