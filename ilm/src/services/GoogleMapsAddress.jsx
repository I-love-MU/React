import axios from 'axios'

export async function getAddressFromCoordinates(latitude, longitude) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`

  try {
    const { data } = await axios.get(url)

    if (data.status === 'OK' && data.results.length > 0) {
      return data.results[0].formatted_address
    }

    // ✅ Google API 응답 상태별 오류 처리
    let errorMessage
    switch (data.status) {
      case 'ZERO_RESULTS':
        errorMessage = '해당 좌표에 대한 주소 정보를 찾을 수 없습니다.'
        break
      case 'OVER_QUERY_LIMIT':
        errorMessage = '쿼리 제한을 초과하여 요청할 수 없습니다. API 할당량을 확인하세요.'
        break
      case 'REQUEST_DENIED':
        errorMessage = 'API 요청이 거부되었습니다. API 키 권한을 확인하세요.'
        break
      case 'INVALID_REQUEST':
        errorMessage = '잘못된 요청입니다. latlng 값이 올바른지 확인하세요.'
        break
      case 'UNKNOWN_ERROR':
        errorMessage = 'Google API 서버에서 예상치 못한 오류가 발생했습니다. 다시 시도하세요.'
        break
      default:
        errorMessage = `알 수 없는 오류 발생 (status: ${data.status})`
    }

    console.warn(`⚠️ 주소 변환 실패: ${errorMessage}`)
    return null
  } catch (error) {
    console.error('❌ 네트워크 또는 서버 오류 발생:', error.message || error)
    return null
  }
}
