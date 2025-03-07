// 📌 src/api/fetchData.js
const API_KEY = "YOUR_API_KEY"; // 👉 발급받은 API 키 입력
const BASE_URL = "https://www.culture.go.kr/openapi/rest/publicperformancedisplays";

// 🎭 특정 장르 데이터 가져오기
export const fetchCategoryData = async (categoryCode) => {
  try {
    const response = await fetch(
      `${BASE_URL}/realm?serviceKey=${API_KEY}&realmCode=${categoryCode}&rows=12`
    );
    const data = await response.json();
    return data?.perforList || [];
  } catch (error) {
    console.error("API 데이터 가져오기 실패:", error);
    return [];
  }
};
