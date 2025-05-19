async function sendData(buttonElement, value) {
  const originalButtonText = buttonElement.textContent;
  buttonElement.disabled = true;
  buttonElement.textContent = 'Processing...';

  try {
    const response = await fetch('http://localhost:5000/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value: value })
    });

    if (response.ok) {
      alert('Completed');
    } else {
      alert('Failure'); // 실패 알림은 원래대로 간단하게
    }
  } catch (error) {
    console.error('Network or communication error:', error);
    alert(`Oops! Could not connect to the server. Please check your internet connection. Error: ${error.message}`);
  } finally {
    buttonElement.disabled = false;
    buttonElement.textContent = originalButtonText;
  }
}

// HTML 문서가 다 로드된 후에 스크립트 실행
document.addEventListener('DOMContentLoaded', () => {
  const button1 = document.getElementById('button1'); // id로 버튼 찾기
  const button2 = document.getElementById('button2'); // id로 버튼 찾기

  if (button1) {
    button1.addEventListener('click', () => sendData(button1, 'Button 1 clicked'));
  }
  if (button2) {
    button2.addEventListener('click', () => sendData(button2, 'Button 2 clicked'));
  }
});