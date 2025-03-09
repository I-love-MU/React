export const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      console.error('❌ Geolocation을 지원하지 않는 브라우저입니다.')
      reject(new Error('Geolocation을 지원하지 않는 브라우저입니다.'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords
        resolve({ latitude, longitude, accuracy })
      },
      (error) => {
        let errorMessage

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = '사용자가 위치 정보 제공을 거부했습니다.'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = '위치 정보를 가져올 수 없습니다.'
            break
          case error.TIMEOUT:
            errorMessage = '위치 정보 요청 시간이 초과되었습니다.'
            break
          default:
            errorMessage = '알 수 없는 위치 정보 오류가 발생했습니다.'
        }

        console.error(`❌ getLocation error (${error.code}): ${errorMessage}`)
        reject(new Error(errorMessage))
      },
      {
        enableHighAccuracy: true, // 더 정확한 위치 요청 (GPS 활용)
        timeout: 10000, // 10초 후 요청 실패 처리
        maximumAge: 0, // 캐시된 위치 정보 사용 안 함
      },
    )
  })
}
