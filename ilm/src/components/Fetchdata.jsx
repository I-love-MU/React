import { OpenApiRealm } from '../services/DetailService';
// ✅ API 데이터를 가져오는 함수
const SERVICE_KEY = import.meta.env.VITE_OPENAPI_API_KEY

// realmCode를 인자로 받아 API 호출
export const fetchExhibitionData = async (realmCode) => {
  try {
    const params = {
      serviceKey: SERVICE_KEY,
      from: "20250201",
      to: "20251231",
      numOfrows: "4",
      PageNo: "1",
      realmCode, // ✅ realmCode 값을 동적으로 설정
    };

    // DetailService의 OpenApiRealm 호출
    const detailData = await OpenApiRealm(params); 
  
    return detailData;
  } catch (error) {
    console.error('API 요청 오류:', error);
    return [];
  }
};

export default fetchExhibitionData;