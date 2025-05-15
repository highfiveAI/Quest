import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  // 🔸 첫 진입 시 DB에서 현재 카운트 값 받아오기
  useEffect(() => {
    fetch("http://localhost:8000/counter")
      .then((res) => res.json())
      .then((data) => setCount(data.value));
  }, []);

  // 🔸 버튼 누르면 API 호출하고 count 갱신
  const changeCount = async (type) => {
    await fetch(`http://localhost:8000/counter/${type}`, {
      method: "POST",
    });
    const res = await fetch("http://localhost:8000/counter");
    const data = await res.json();
    setCount(data.value);
  };

  return (
    <div className="counter-container">
      <h2>손우재 숙제</h2>
      <div className="counter">
        <button onClick={() => changeCount("decrement")}>-</button>
        <span className="count">{count}</span>
        <button onClick={() => changeCount("increment")}>+</button>
      </div>
    </div>
  );
}

export default App;
