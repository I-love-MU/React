import axios from 'axios'
import { parseStringPromise } from 'xml2js'

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY

/**
 * 현재 진행 중인 행사 데이터를 가져오는 함수
 * @param {string} from 시작 기간 (예: '20250319')
 * @param {string} to 종료 기간 (예: '20250319')
 * @param {string} serviceTp 서비스 구분 (A: 공연/전시, B: 행사/축제, C: 교육/체험)
 * @param {number} numOfRows 가져올 데이터 개수
 * @returns {Promise<Array>} 현재 진행 중인 행사 목록
 */
export const fetchOngoingEvents = async (from, to, serviceTp, numOfRows = 10) => {
  try {
    const url = `${BASE_URL}/period?serviceKey=${API_KEY}&from=${from}&to=${to}&serviceTp=${serviceTp}&numOfRows=${numOfRows}&PageNo=1`

    console.log('API 요청 URL:', url)

    const response = await axios.get(url) // ✅ axios로 변경

    // 응답이 XML인지 확인 후 변환
    if (typeof response.data === 'string' && response.data.startsWith('<')) {
      const data = await parseStringPromise(response.data)
      return data?.OpenAPI_ServiceResponse?.body?.items?.item || []
    }

    return response.data?.body?.items?.item || []
  } catch (error) {
    console.error('현재 진행 중인 행사를 가져오는 중 오류 발생:', error)
    return []
  }
}

/**
 * 특정 장르의 공연 데이터를 가져오는 함수
 * @param {string} realmCode 장르 코드 (예: B000 - 음악/콘서트)
 * @param {string} from 시작 기간 (예: '20250319')
 * @param {string} to 종료 기간 (예: '20250319')
 * @param {number} numOfRows 가져올 데이터 개수
 * @returns {Promise<Array>} 해당 장르의 공연 목록
 */
export const fetchPerformancesByRealm = async (realmCode, from, to, numOfRows = 10) => {
  try {
    const url = `${BASE_URL}/realm?serviceKey=${API_KEY}&realmCode=${realmCode}&from=${from}&to=${to}&numOfRows=${numOfRows}&PageNo=1`

    console.log('API 요청 URL:', url)

    const response = await axios.get(url) // ✅ axios로 변경

    // XML이면 JSON 변환
    if (typeof response.data === 'string' && response.data.startsWith('<')) {
      const data = await parseStringPromise(response.data)
      return data?.OpenAPI_ServiceResponse?.body?.items?.item || []
    }

    return response.data?.body?.items?.item || []
  } catch (error) {
    console.error('공연 정보를 가져오는 중 오류 발생:', error)
    return []
  }
}

/**
 * 특정 공연의 상세 정보를 가져오는 함수
 * @param {string} performanceId 공연 ID
 * @returns {Promise<Object>} 공연 상세 정보
 */
export const fetchPerformanceData = async (performanceId) => {
  try {
    const url = `${BASE_URL}/detail?serviceKey=${API_KEY}&seq=${performanceId}`

    console.log('API 요청 URL:', url)

    const response = await axios.get(url) // axios로 변경

    // XML이면 JSON 변환
    if (typeof response.data === 'string' && response.data.startsWith('<')) {
      const data = await parseStringPromise(response.data)
      return data?.OpenAPI_ServiceResponse?.body?.items?.item || {}
    }

    return response.data?.body?.items?.item || {}
  } catch (error) {
    console.error('공연 상세 정보를 가져오는 중 오류 발생:', error)
    return null
  }
}
