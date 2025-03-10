import { useCallback, useEffect } from 'react'
import { getLocation } from '../../../services/currentLocation/Geolocation'
import { getAddressFromCoordinates } from '../../../services/currentLocation/GoogleMapsAddress'

function CurrentLocationInfo({ onLocationUpdate }) {
  // 현재 위경도와 주소를 반환
  const getCurrentLocation = useCallback(async () => {
    try {
      const loc = await getLocation()
      const fetchedAddress = await getAddressFromCoordinates(loc.latitude, loc.longitude)
      const newLocation = { latitude: loc.latitude, longitude: loc.longitude, address: fetchedAddress }
      onLocationUpdate(newLocation)
    } catch (error) {
      console.error('위치 정보를 가져오는 중 오류 발생:', error)
    }
  }, [])

  useEffect(() => {
    getCurrentLocation()
  }, [])

  return <></>
}

export default CurrentLocationInfo
