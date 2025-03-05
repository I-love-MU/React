import { useState } from 'react'
import { getLocation } from '../services/Geolocation'
import { getAddressFromCoordinates } from '../services/GoogleMapsAddress'

function LocationFetcher() {
  const [location, setLocation] = useState(null)
  const [address, setAddress] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchLocationAndAddress = async () => {
    setLoading(true)
    try {
      const loc = await getLocation()
      if (loc) {
        setLocation(loc)
        const fetchedAddress = await getAddressFromCoordinates(loc.latitude, loc.longitude)
        setAddress(fetchedAddress)
      }
    } catch (error) {
      console.error('위치 정보를 가져오는 중 오류 발생:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>현재 위치 정보</h2>
      {location ? (
        <p>
          위도: {location.latitude}, 경도: {location.longitude}, 정확도: {location.accuracy}m
        </p>
      ) : (
        <p>위치 정보를 가져오려면 버튼을 클릭하세요.</p>
      )}

      <h2>현재 위치 주소</h2>
      <p>{address ? address : '주소 정보 없음'}</p>

      <button onClick={fetchLocationAndAddress} disabled={loading}>
        {loading ? '위치 가져오는 중...' : '위치 정보 가져오기'}
      </button>
    </div>
  )
}

export default LocationFetcher
