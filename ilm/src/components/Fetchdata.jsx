//API 요청 모음 함수 
import axios from "axios";


const API_URL2 = `/api/pblprfr`;

// ✅ XML을 JSON으로 변환하는 함수 (DOMParser 사용)
const parseXML = (xmlString) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlString, "application/xml");
  const dbs = xml.getElementsByTagName("db");

// ?. 옵셔널 체이닝 값이 없을 경우 우측 값 적용 
  let data = [];
  for (let db of dbs) {
    data.push({
      title: db.getElementsByTagName("prfnm")[0]?.textContent || "제목 없음",
      id: db.getElementsByTagName("mt20id")[0]?.textContent || "N/A",
      poster: db.getElementsByTagName("poster")[0]?.textContent || "N/A",
      prfpdfrom: db.getElementsByTagName("prfpdfrom")[0]?.textContent || "N/A",
      prfpdto: db.getElementsByTagName("prfpdto")[0]?.textContent || "N/A",
      fcltynm: db.getElementsByTagName("fcltynm")[0]?.textContent || "N/A",
      area: db.getElementsByTagName("area")[0]?.textContent || "N/A",
 
      
    });
  }
  return data;
};

  // API URL 값 가져와서 파라미터로 전달받아 shcate 값 변경하기 
  export const fetchExhibitionData = async (shcate = "AAAA") => {
    try {
        const params = {
            service: "080368b7702b47339979702578fcbd3e",
            stdate: "20250201",
            eddate: "20251231",
            rows: "4",   
            cpage: "1",
            shcate: shcate, // ✅ shcate 값을 동적으로 설정
          };
        //axios로 api 호출
        const response = await axios.get(API_URL2, { params, responseType: "text", withCredentials: true });
        //api 호출 xml을 json 으로 파싱
        const jsonData = parseXML(response.data);
      return jsonData;
    } catch (error) {
      console.error("API 요청 오류:", error);
      return [];
    }
  };
  