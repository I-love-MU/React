import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'

// HTML 엔터티 디코딩 함수
const decodeHTMLEntities = (text) => {
  const doc = new DOMParser().parseFromString(text, 'text/html')
  return doc.documentElement.textContent
}

// 환경 변수에서 API 정보 가져오기
const BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY

// XML → JSON 파서 설정
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  allowBooleanAttributes: true,
  parseTagValue: true,
  parseAttributeValue: true,
  trimValues: true,
  decodeHTMLchar: true,
})

// XML 문자열을 JSON 형태로 파싱 및 정제
const parseXML = (xmlString) => {
  const jsonData = parser.parse(xmlString)
  const items = jsonData.response?.body?.items?.item || []
  const events = Array.isArray(items) ? items : [items]

  return events.map((event) => ({
    title: decodeHTMLEntities(event.title || ''),
    startDate: event.startDate || '',
    endDate: event.endDate || '',
    place: event.place || '',
    thumbnail: event.thumbnail || '',
    seq: event.seq || '', // 상세페이지 이동 시 필요
  }))
}

// 공통 요청 유틸 함수
const fetchFromApi = async (path, queryParams = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/${path}`, {
      params: {
        serviceKey: API_KEY,
        PageNo: 1,
        numOfrows: 10,
        ...queryParams,
      },
      responseType: 'text',
    })
    return parseXML(response.data)
  } catch (error) {
    console.error(`🚨 API 요청 실패 (${path}):`, error)
    return []
  }
}

// ✅ SimplifiedCarousel에서 사용하는 공연 장르별 API
export const fetchPerformancesByRealm = async ({ realmCode, from, to, numOfRows = 10 }) => {
  return await fetchFromApi('realm', { realmCode, from, to, numOfrows: numOfRows })
}
