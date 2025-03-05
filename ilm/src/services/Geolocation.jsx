export const getLocation = () => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.log('Geolocation을 지원하지 않는 브라우저입니다.')
      resolve(null)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords
        resolve({ latitude, longitude, accuracy })
      },
      (error) => {
        console.log(error.code)
        resolve(null)
      },
    )
  })
}
