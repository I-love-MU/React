import axios from "axios";
import { XMLParser } from "fast-xml-parser"; // fast-xml-parser 라이브러리 import
import { ExhibitionDTO } from "../dto/ExhibitionDTO"; // DTO import

const API_URL2 = `/api/pblprfr`;

// ✅ XML을 JSON으로 변환하는 함수
const parseXML = (xmlString) => {
  const parser = new XMLParser({
    ignoreAttributes: false, // XML 속성을 유지
    attributeNamePrefix: "", // 속성 접두사 제거
  });

  const jsonObj = parser.parse(xmlString); // XML을 JSON으로 변환
  

  // JSON 데이터에서 필요한 정보 추출
  const dbs = jsonObj?.dbs?.db;

  // dbs가 배열인지 확인하고, 단일 객체라면 배열로 변환
  const dbArray = Array.isArray(dbs) ? dbs : dbs ? [dbs] : [];
  
  // DTO를 사용하여 데이터를 변환
  const data = dbArray.map((db) => new ExhibitionDTO(db));

  return data;
};

// ✅ API 데이터를 가져오는 함수
export const fetchExhibitionData = async (shcate = "AAAA") => {
  try {
    const params = {
      service: "080368b7702b47339979702578fcbd3e",
      stdate: "20250201",
      eddate: "20251231",
      rows: "4",
      cpage: "1",
      shcate, // ✅ shcate 값을 동적으로 설정
    };

    // axios로 API 호출
    const response = await axios.get(API_URL2, { params, responseType: "text", withCredentials: true });

    console.log("Raw XML Response:", response.data); // XML 데이터 확인
    const jsonData = parseXML(response.data); // XML 데이터를 JSON으로 변환
    console.log("Parsed JSON Data:", jsonData); // 변환된 JSON 데이터 확인

    return jsonData;
  } catch (error) {
    console.error("API 요청 오류:", error);
    return [];
  }
};

export default fetchExhibitionData;