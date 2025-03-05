import { useEffect, useState } from 'react'
import { getLocation } from '../services/Geolocation'
import { getAddressFromCoordinates } from '../services/GoogleMapsAddress'

function LocationFetcher() {
  const [location, setLocation] = useState(null)
  const [address, setAddress] = useState(null)

  useEffect(() => {
    const fetchLocation = async () => {
      const loc = await getLocation()
      if (loc) {
        setLocation(loc)
        const fetchedAddress = getAddressFromCoordinates(loc.latitude, loc.longitude)
        setAddress(fetchedAddress)
      }
    }

    fetchLocation()
  }, [])

  return (
    <div>
      <h2>현재 위치 정보</h2>
      {location ? (
        <p>
          위도: {location.latitude}, 경도: {location.longitude}, 정확도: {location.accuracy}m
        </p>
      ) : (
        <p>위치 정보를 가져오는 중...</p>
      )}
      <h2>현재 위치 주소</h2>
      <p>{address ? address : '주소를 가져오는 중...'}</p>
    </div>
  )
}

export default LocationFetcher
