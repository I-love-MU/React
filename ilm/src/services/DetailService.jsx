import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'

const BASE_URL = 'https://apis.data.go.kr/B553457/nopenapi/rest/publicperformancedisplays'
const API_KEY = import.meta.env.VITE_OPENAPI_API_KEY

// 공연 상세 정보를 가져오는 함수
export const OpenApiDetail = async (contentNum) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/detail?serviceKey=${API_KEY}&seq=${contentNum}`, 
      {
        responseType: 'text'
      }
    )

    // XML 데이터를 JSON으로 변환
    const parser = new XMLParser({ 
      ignoreAttributes: false,
      parseAttributeValue: true
    })
    
    const result = parser.parse(response.data)

    const jsonData = result?.response?.body?.items?.item

    if (!jsonData) {
      throw new Error('API 응답에서 데이터를 찾을 수 없습니다.')
    }

    // JSON 객체로 변환하여 반환
    return JSON.parse(JSON.stringify(jsonData))
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error)
    throw error
  }
}
