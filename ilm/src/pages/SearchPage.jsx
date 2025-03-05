import { useState } from 'react'
import { getLocation } from '../services/Geolocation'

function LocationFetcher() {
  const [location, setLocation] = useState(null)

  const handleGetLocation = async () => {
    const loc = await getLocation()
    setLocation(loc)
  }

  return (
    <div>
      <button onClick={handleGetLocation}>위치 가져오기</button>
      {location ? (
        <div>
          <p>
            위도: {location.latitude}, 경도: {location.longitude}
          </p>
        </div>
      ) : (
        <p>위치 정보를 가져올 수 없습니다.</p>
      )}
    </div>
  )
}

export default LocationFetcher
