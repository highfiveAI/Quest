from flask import Flask, request
from flask_cors import CORS
import pymysql
import traceback
import time

app = Flask(__name__)
CORS(app)

def get_connection():
    for i in range(10):
        try:
            return pymysql.connect(
                host='db',
                user='root',
                password='password',
                database='testdb',
                charset='utf8mb4',
                cursorclass=pymysql.cursors.DictCursor
            )
        except Exception as e:
            print(f"DB 연결 재시도 중... ({i+1}/10) 에러: {e}")
            time.sleep(1)
    raise RuntimeError("MySQL에 연결할 수 없습니다.")

@app.route('/')
def home():
    return "from Backend!"

@app.route('/api/save', methods=['POST'])
def save():
    try:
        data = request.json.get('value')
        print("받은 데이터:", data, flush=True)

        conn = get_connection()
        with conn:
            with conn.cursor() as cursor:
                cursor.execute("INSERT INTO logs (value) VALUES (%s)", (data,))
            conn.commit()

        return {'status': 'ok'}, 200
    except Exception as e:
        print("백엔드 에러:", e, flush=True)
        traceback.print_exc()
        return {'status': 'error', 'message': str(e)}, 500

if __name__ == '__main__':
    app.run(host='0.0.0.0')
