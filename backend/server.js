// backend/server.js
const express = require('express');
const cors = require('cors'); // cors 패키지 불러오기
const app = express();
const port = 3000;

app.use(cors()); // CORS 미들웨어 사용 설정 (모든 origin에서의 요청을 허용)

// 간단한 GET API 생성
app.get('/api/data', (req, res) => {
  res.json({ message: '안녕하세요! 백엔드에서 보낸 데이터입니다. (CORS 해결!)' }); // 메시지 변경 (선택 사항)
});

app.listen(port, () => {
  console.log(`백엔드 서버가 http://localhost:${port} 에서 실행 중입니다.`);
});