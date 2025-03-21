import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'

// 환경 변수에서 API 정보 가져오기
const BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY

// XML → JSON 파서 설정
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  parseTagValue: true,
  parseAttributeValue: true,
  trimValues: true,
})

// XML 문자열을 JSON 형태로 변환
const parseXML = (xmlString) => {
  const jsonData = parser.parse(xmlString)
  const items = jsonData.response?.body?.items?.item || []
  return Array.isArray(items) ? items : [items]
}

// 공통 API 요청 함수
const fetchFromApi = async (path, queryParams = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/${path}`, {
      params: { serviceKey: API_KEY, PageNo: 1, numOfRows: 10, ...queryParams },
      responseType: 'text',
    })
    return parseXML(response.data)
  } catch (error) {
    console.error(`🚨 API 요청 실패:`, error)
    return []
  }
}

// 공연 장르별 API
export const fetchPerformancesByRealm = async ({ realmCode, from, to, numOfRows = 10 }) => {
  return fetchFromApi('realm', { realmCode, from, to, numOfRows })
}
