import axios from "axios";

// 공공 API 기본 URL
const API_BASE_URL = "https://www.kopis.or.kr/openApi/restful/prfplc";

// 공공 데이터 포털에서 발급받은 본인의 API 키를 입력하세요.
const SERVICE_KEY = "YOUR_PUBLIC_API_KEY";  // 여기에 API 키 입력

/**
 * 공연장 정보 가져오기
 * @param {number} numOfRows - 한 번에 불러올 데이터 개수 (기본값: 10)
 * @returns {Promise<Array>} - API에서 가져온 공연장 데이터 배열
 */
export const fetchPerformanceData = async (numOfRows = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}`, {
      params: {
        serviceKey: SERVICE_KEY,  // API 인증키 (필수)
        cpage: "1",               // 페이지 번호
        rows: numOfRows.toString(), // 불러올 개수
        dtype: "json",            // 응답 데이터 타입
      },
    });

    console.log("API 응답 데이터:", response.data);
    return response.data || [];  // 데이터가 없으면 빈 배열 반환
  } catch (error) {
    console.error("API 호출 오류:", error);
    return [];
  }
};
