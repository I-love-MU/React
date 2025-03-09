import { useState, useCallback, useEffect } from 'react'
import { getLocation } from './Geolocation'
import { getAddressFromCoordinates } from './GoogleMapsAddress'

function CurrentLocationInfo({ locationFilter }) {
  const [currentLocation, setCurrentLocation] = useState(null)
  const [currentAddress, setCurrentAddress] = useState(null)

  // 현재 위치 정보 및 주소 가져오기
  const fetchCurrentLocationAndAddress = useCallback(async () => {
    try {
      const loc = await getLocation()
      if (loc) {
        setCurrentLocation(loc)
        const fetchedAddress = await getAddressFromCoordinates(loc.latitude, loc.longitude)
        setCurrentAddress(fetchedAddress)
      }
    } catch (error) {
      console.error('위치 정보를 가져오는 중 오류 발생:', error)
    }
  }, [])

  // locationFilter가 'current'일 때만 위치 조회 실행
  useEffect(() => {
    if (locationFilter === 'current') {
      fetchCurrentLocationAndAddress()
    }
  }, [locationFilter, fetchCurrentLocationAndAddress])

  if (locationFilter !== 'current') return null

  return (
    <>
      <h2>현재 위치 좌표</h2>
      {currentLocation ? (
        <p>
          위도: {currentLocation.latitude}, 경도: {currentLocation.longitude}, 정확도: {currentLocation.accuracy}m
        </p>
      ) : (
        <p>위치 정보를 가져오지 못 했습니다.</p>
      )}

      <h2>현재 위치 주소</h2>
      <p>{currentAddress ? currentAddress : '주소 정보 없음'}</p>
    </>
  )
}

export default CurrentLocationInfo
