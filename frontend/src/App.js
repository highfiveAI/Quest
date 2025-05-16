import React, { useState, useEffect } from "react";

function App() {
  const [numbers, setNumbers] = useState([]);
  const [lastNumber, setLastNumber] = useState(null);

  // 숫자 리스트 불러오기
  const fetchNumbers = async () => {
    const res = await fetch("http://localhost:8000/numbers");
    const data = await res.json();
    setNumbers(data);
    if (data.length > 0) {
      setLastNumber(data[data.length - 1].value);
    }
  };

  useEffect(() => {
    fetchNumbers();
  }, []);

  // 숫자 생성 버튼 클릭
  const handleGenerate = async () => {
    const res = await fetch("http://localhost:8000/generate", {
      method: "POST",
    });
    const data = await res.json();
    setLastNumber(data.value);
    fetchNumbers();
  };

  // 숫자 리스트 새로고침 버튼
  const handleRefresh = () => {
    fetchNumbers();
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>마지막 생성 숫자: {lastNumber !== null ? lastNumber : "없음"}</h2>
      <button onClick={handleGenerate} style={{ marginRight: 10 }}>숫자 생성 및 저장</button>
      <button onClick={handleRefresh}>숫자 리스트 새로고침</button>
      <div style={{ marginTop: 30 }}>
        <h3>저장된 숫자 목록</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {numbers.map((n) => (
            <li key={n.id}>{n.value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App; 