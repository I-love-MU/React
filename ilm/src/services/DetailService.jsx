import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'

const BASE_URL = 'https://apis.data.go.kr/B553457/nopenapi/rest/publicperformancedisplays'
const API_KEY = import.meta.env.VITE_OPENAPI_API_KEY

// 공연 상세 정보를 가져오는 함수
export const OpenApiDetail = async (contentNum) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/detail?serviceKey=${API_KEY}&seq=${contentNum}`
    )

    // XML 데이터를 JSON으로 변환
    const parser = new XMLParser({
      ignoreAttributes: false,
      parseAttributeValue: true
    })
    
    const result = parser.parse(response.data)
    
    // 조건문으로 API 검증
    if (!result || !result.response || !result.response.body || !result.response.body.items) {
      console.error('API 응답 구조가 예상과 다릅니다:', result)
      throw new Error('API 응답 구조가 예상과 다릅니다')
    }
    
    // 객체, 배열 처리
    const contents = result.response.body.items.item
    
    // 결과가 배열인지 확인
    return Array.isArray(contents) ? contents : contents ? [contents] : []
  } catch (error) {
    console.error('API 호출 오류 발생:', error)
    throw error
  }
}
