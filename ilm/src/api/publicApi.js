import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'

// HTML 엔터티를 정상적인 문자로 변환하는 함수
const decodeHTMLEntities = (text) => {
  const doc = new DOMParser().parseFromString(text, 'text/html')
  return doc.documentElement.textContent
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY

// XML 파서 설정 (HTML 엔터티 디코딩 활성화)
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  allowBooleanAttributes: true,
  parseTagValue: true,
  parseAttributeValue: true,
  trimValues: true,
  decodeHTMLchar: true, // HTML 엔터티 디코딩 활성화
})

// XML을 JSON으로 변환하는 함수
const parseXML = (xmlString) => {
  const jsonData = parser.parse(xmlString)
  const items = jsonData.response?.body?.items?.item || []

  // API 응답이 객체일 경우 배열로 변환
  const events = Array.isArray(items) ? items : [items]

  // HTML 엔터티 변환 적용
  return events.map((event) => ({
    title: decodeHTMLEntities(event.title || ''), // ✅ HTML 엔터티 제거
    startDate: event.startDate || '',
    endDate: event.endDate || '',
    place: event.place || '',
    thumbnail: event.thumbnail || '',
  }))
}

/**
 * 현재 진행 중인 행사 데이터를 가져오는 함수
 */
export const fetchOngoingEvents = async (params) => {
  try {
    const response = await axios.get(`${BASE_URL}/period`, {
      params: {
        serviceKey: API_KEY,
        PageNo: 1,
        numOfrows: params.numOfRows || 10,
        serviceTp: params.serviceTp,
        from: params.from,
        to: params.to,
      },
      responseType: 'text', // XML 응답
    })

    return parseXML(response.data)
  } catch (error) {
    console.error('🚨 현재 진행 중인 행사를 가져오는 중 오류 발생:', error)
    return []
  }
}

/**
 * 특정 장르의 공연 데이터를 가져오는 함수
 */
export const fetchPerformancesByRealm = async ({ realmCode, from, to, numOfRows = 10 }) => {
  try {
    const response = await axios.get(`${BASE_URL}/realm`, {
      params: {
        serviceKey: API_KEY,
        PageNo: 1,
        numOfrows: numOfRows,
        realmCode,
        from,
        to,
      },
      responseType: 'text',
    })

    return parseXML(response.data)
  } catch (error) {
    console.error('🚨 공연 정보를 가져오는 중 오류 발생:', error)
    return []
  }
}

/**
 * 특정 공연의 상세 정보를 가져오는 함수
 */
export const fetchPerformanceData = async (performanceId) => {
  try {
    const response = await axios.get(`${BASE_URL}/detail`, {
      params: {
        serviceKey: API_KEY,
        seq: performanceId,
      },
      responseType: 'text',
    })

    const data = parseXML(response.data)
    return data.length > 0 ? data[0] : {} // 상세 정보는 단일 객체
  } catch (error) {
    console.error('🚨 공연 상세 정보를 가져오는 중 오류 발생:', error)
    return null
  }
}
