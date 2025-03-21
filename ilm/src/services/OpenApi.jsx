import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'

// XML에서 JSON으로 변환하는 파서 설정
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
})

// 기본 URL 설정
const BASE_URL = 'https://apis.data.go.kr/B553457/nopenapi/rest/publicperformancedisplays'

// API 엔드포인트 타입 정의
const API_ENDPOINTS = {
  REALM: 'realm',
  AREA: 'area',
  DETAIL: 'detail',
  PERIOD: 'period',
  // 추가 엔드포인트들...
}

// 통합 API 요청 함수
export const fetchOpenApi = async (endpointType, apiFilter) => {
  const url = `${BASE_URL}/${endpointType}`

  try {
    const response = await axios.get(url, { params: apiFilter })

    const xmlData = response.data
    const jsonData = parser.parse(xmlData)
    const content = jsonData.response.body.items.item

    // 결과가 항상 배열인지 확인
    return Array.isArray(content) ? content : content ? [content] : []
  } catch (error) {
    console.error(`${endpointType} API 요청 실패:`, error)
    throw error
  }
}

// 기존 함수는 새 통합 함수를 사용하도록 리팩토링
export const OpenApiRealm = async (apiFilter) => {
  return fetchOpenApi(API_ENDPOINTS.REALM, apiFilter)
}

// 다른 API 요청 함수들
export const OpenApiArea = async (apiFilter) => {
  return fetchOpenApi(API_ENDPOINTS.AREA, apiFilter)
}

export const OpenApiDetail = async (apiFilter) => {
  return fetchOpenApi(API_ENDPOINTS.DETAIL, apiFilter)
}
