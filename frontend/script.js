// frontend/script.js
document.addEventListener('DOMContentLoaded', () => {
    const getDataButton = document.getElementById('getDataButton');
    const otherButton = document.getElementById('otherButton');
    const apiResponseLabel = document.getElementById('apiResponseLabel');

    getDataButton.addEventListener('click', async () => {
        try {
            // 백엔드 API 호출 (Docker Compose 사용 시 백엔드 서비스 이름과 포트로 접근 가능)
            // 여기서는 localhost와 백엔드가 노출된 포트(예: 3001)를 사용합니다.
            // Docker Compose 네트워크 내에서는 'http://backend:3000/api/data'와 같이 서비스명으로 호출 가능하지만,
            // 브라우저에서 직접 호출할 때는 Docker 호스트의 IP와 매핑된 포트를 사용해야 합니다.
            const response = await fetch('http://localhost:3001/api/data'); // 백엔드가 3001 포트로 노출될 예정
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            apiResponseLabel.textContent = data.message;
        } catch (error) {
            apiResponseLabel.textContent = '데이터 가져오기 실패: ' + error.message;
            console.error('Error fetching data:', error);
        }
    });

    otherButton.addEventListener('click', () => {
        apiResponseLabel.textContent = '다른 버튼이 클릭되었습니다! (아직 기능 없음)';
    });
});