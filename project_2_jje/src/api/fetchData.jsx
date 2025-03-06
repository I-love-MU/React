// 📂 src/api/fetchData.jsx
export const fetchEventData = async () => {
  const API_KEY = "YOUR_API_KEY"; // 🔹 여기에 API 키 입력
  const url = `https://www.culture.go.kr/openapi/rest/publicperformancedisplays/realm?serviceKey=${API_KEY}&realmCode=A000&rows=10&cPage=1`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("데이터를 가져오는 데 실패했습니다.");
    
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");

    const items = Array.from(xml.querySelectorAll("item")).map((item) => ({
      title: item.querySelector("title")?.textContent || "제목 없음",
      genreCode: "A000",
      poster: item.querySelector("poster")?.textContent || "default.jpg",
    }));

    return items;
  } catch (error) {
    console.error("API 오류:", error);
    return [];
  }
};
