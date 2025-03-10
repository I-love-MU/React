import axios from "axios";
import xml2js from "xml2js"; // XML → JSON 변환

const API_URL = "http://www.kopis.or.kr/openApi/restful/pblprfr";
const SERVICE_KEY = "5f85f47bc026474d8d1b162a7b7c5f12"; // 🔥 서비스 키 입력 필요

export const fetchKopisData = async () => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        service: SERVICE_KEY,
        stdate: "20240301",
        eddate: "20240331",
        cpage: 1,
        rows: 10,
        prfstate: "02",
      },
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", // User-Agent 추가
        Accept: "application/xml", // 🔥 XML 요청
      },
    });

    // 🔥 XML을 JSON으로 변환
    const jsonData = await xml2js.parseStringPromise(response.data, { explicitArray: false });
    return jsonData.dbs.db || [];
  } catch (error) {
    console.error("❌ API 호출 오류:", error);
    return [];
  }
};
