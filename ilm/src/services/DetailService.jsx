import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'


const BASE_URL = 'https://apis.data.go.kr/B553457/nopenapi/rest/publicperformancedisplays'

// 공연 분류코드를 가져오는 함수
export const OpenApiRealm = async (params) => {
  try {
        // axios로 API 호출
        const response = await axios.get(`${BASE_URL}/realm`, {
          params,

        });

        // fast-xml-parser로 XML 파싱
     const parser = new XMLParser({
      ignoreAttributes: false,
      parseAttributeValue: true,
    });

    const result = parser.parse(response.data)


    
    // 조건문으로 API 검증
    if (!result || !result.response || !result.response.body || !result.response.body.items) {
      console.error('API 응답 구조가 예상과 다릅니다:', result)
      throw new Error('API 응답 구조가 예상과 다릅니다')
    }
    
    // 객체, 배열 처리
    const contents = result.response.body.items.item

    // 결과가 배열인지 확인하고 그대로 반환
    return Array.isArray(contents) ? contents : contents ? [contents] : [];
  } catch (error) {
    console.error('API 호출 오류 발생:', error);
    throw error;
  }
};
