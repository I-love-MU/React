import { OpenApiRealm } from '../services/ApiService';
// ✅ API 데이터를 가져오는 함수
const key = import.meta.env.VITE_API_DECODE_KEY


// 랜덤 날짜 생성 함수
const getRandomDate = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
  const randomDate = new Date(randomTime);

  // YYYYMMDD 형식으로 반환
  const year = randomDate.getFullYear();
  const month = String(randomDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(randomDate.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};

// realmCode를 인자로 받아 API 호출
export const fetchExhibitionData = async (realmCode) => {
  try {
    const params = {
      serviceKey: key,
      from: getRandomDate("2022-01-01", "2025-03-30"), // 2023년 1월 1일부터 2025년 3월 30일 사이의 랜덤 날짜
      to: "20261231",
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