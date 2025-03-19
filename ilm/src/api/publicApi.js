// src/api/publicApi.js

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY

/**
 * 특정 공연의 상세 정보를 가져오는 함수
 * @param {string} performanceId 공연 ID
 * @returns {Promise<Object>} 공연 상세 정보
 */
export const fetchPerformanceData = async (performanceId) => {
  try {
    const response = await fetch(`${BASE_URL}/detail?serviceKey=${API_KEY}&seq=${performanceId}`)

    if (!response.ok) {
      throw new Error('API 응답 오류')
    }

    const data = await response.json()
    return data.body.items.item || {} // 객체로 반환
  } catch (error) {
    console.error('공연 상세 정보를 가져오는 중 오류 발생:', error)
    return null
  }
}
