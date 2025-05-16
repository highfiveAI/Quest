const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'counteruser',
  password: process.env.DB_PASSWORD || 'counterpw',
  database: process.env.DB_NAME || 'counterdb',
};

// 숫자 조회 API
app.get('/count', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.execute('SELECT count FROM counter WHERE id = 1');
    await conn.end();
    if (rows.length > 0) {
      res.json({ count: rows[0].count });
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 숫자 증가 API
app.post('/increment', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    await conn.execute('UPDATE counter SET count = count + 1 WHERE id = 1');
    const [rows] = await conn.execute('SELECT count FROM counter WHERE id = 1');
    await conn.end();
    res.json({ count: rows[0].count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 숫자 감소 API (옵션)
app.post('/decrement', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    await conn.execute('UPDATE counter SET count = count - 1 WHERE id = 1');
    const [rows] = await conn.execute('SELECT count FROM counter WHERE id = 1');
    await conn.end();
    res.json({ count: rows[0].count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API 서버가 ${PORT}번 포트에서 실행 중입니다.`);
}); 