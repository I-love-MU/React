// src/api/publicApi.js

import axios from "axios";
import { parseStringPromise } from "xml2js"; // ✅ XML → JSON 변환 라이브러리

// 한국문화정보원 API 기본 설정
const API_BASE_URL = "http://apis.data.go.kr/B553457/nopenapi/rest/publicperformancedisplays";
const API_KEY = "pioNaBQBJ%2FABwVXqTllZFvr7FUBvhyIvfwaaH%2F0hZSC%2B8LDRLjenEw0ed5uWdL0bptwm5vBBFZyei0p4dieK%2BQ%3D%3D"; // Encoding된 키

// 공연 데이터 가져오는 함수
export const fetchPerformanceData = async (numOfRows = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}`, {
      params: {
        serviceKey: API_KEY,
        numOfRows,
        pageNo: 1,
      },
      responseType: "text", // XML 형식이므로 text로 받음
    });

    // XML → JSON 변환
    const jsonData = await parseStringPromise(response.data);
    const performances = jsonData.response.body[0].items[0].item;

    return performances.map((perf) => ({
      id: perf.mt20id[0], // 공연 ID
      prfnm: perf.prfnm[0], // 공연명
      prfpdfrom: perf.prfpdfrom[0], // 공연 시작일
      prfpdto: perf.prfpdto[0], // 공연 종료일
      poster: perf.poster ? perf.poster[0] : "/default.jpg", // 포스터 이미지
    }));
  } catch (error) {
    console.error("❌ 공연 데이터를 불러오는 중 오류 발생:", error);
    return [];
  }
};
