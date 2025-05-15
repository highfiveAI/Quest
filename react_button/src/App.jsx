import { useEffect, useState } from "react";

function App() {

  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");

  const getInfo = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/button`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data1 = await response.json();
        setData(data1);
      } else {
        console.error("응답 오류");
      }
    } catch (error) {
      console.error("데이터 받아오기 오류", error);
    }
  };

  const setInfo = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/button`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          name: title,
          count: 0
         }),
      });
      if (response.ok) {

        setData([...data , title]);
        setTitle("");
      } else {
        console.error("응답 오류");
      }
    } catch (error) {
      console.error("데이터 받아오기 오류", error);
    }
  };

  const setCount = async (index) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/button/${index}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        getInfo();
      } else {
        console.error("응답 오류");
      }
    } catch (error) {
      console.error("데이터 받아오기 오류", error);
    }
  };


  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    getInfo();
  }, [data]);

  if(!data)
    return <div>로딩 중...</div>;
  

  return (
    <>
      <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
      />
      <button onClick={() => setInfo()}>
        생성
      </button>

      {data.map((da, index) => (
        <div key={index}>
          <label>
            {da.name}
          </label>
          <button onClick={() => setCount(index + 1)}>
            {da.count}
          </button>  
        </div>
      ))  
      }
    </>
  )
}

export default App
