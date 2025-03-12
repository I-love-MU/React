import axios from "axios";
import { parseStringPromise } from "xml2js"; // XML → JSON 변환 라이브러리

const API_URL = "http://www.kopis.or.kr/openApi/restful/pblprfr";
const SERVICE_KEY = "5f85f47bc026474d8d1b162a7b7c5f12"; // 🔍 서비스 키 확인 필요

export const fetchKopisData = async () => {
  try {
    const response = await axios.get(`${API_URL}`, {
      params: {
        service: SERVICE_KEY,
        stdate: "20240301",
        eddate: "20240331",
        cpage: 1,
        rows: 5,
        prfstate: "02",
      },
    });

    // 🔍 XML → JSON 변환
    const jsonData = await parseStringPromise(response.data);
    console.log("✅ 변환된 JSON 데이터:", jsonData);

    return jsonData;
  } catch (error) {
    console.error("❌ API 호출 오류:", error);
    return [];
  }
};
