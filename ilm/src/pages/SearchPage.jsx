import { useState, useCallback, useEffect } from 'react'
import { getLocation } from '../services/currentLocation/Geolocation'
import { getAddressFromCoordinates } from '../services/currentLocation/GoogleMapsAddress'
import { InputGroup, Form } from 'react-bootstrap'
import GoogleAddressAutocomplete from '../services/pointLocation/GoogleAddressAutocomplete'

function LocationFetcher() {
  const [selectedLocation, setSelectedLocation] = useState('')
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 })

  const handleLocationSelect = (location, latLng) => {
    setSelectedLocation(location)
    setCoordinates(latLng)
  }

  // 필터 상태 관리 (라디오 버튼으로 변경)
  const [locationFilter, setLocationFilter] = useState('')

  // 위치 정보 및 주소 상태 관리
  const [currentLocation, setCurrentLocation] = useState(null)
  const [currentAddress, setCurrentAddress] = useState(null)

  // 라디오 버튼 상태 변경 핸들러
  const handleLocationFilterChange = (event) => {
    setLocationFilter(event.target.value)
  }

  // 위치 정보 및 주소 가져오기
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

  // 라디오 버튼 값이 'current'일 때 위치 조회
  useEffect(() => {
    if (locationFilter === 'current') {
      fetchCurrentLocationAndAddress()
    }
  }, [locationFilter, fetchCurrentLocationAndAddress])

  return (
    <div>
      <InputGroup className='mb-3'>
        <Form.Check
          type='radio'
          label='현재 위치로 탐색'
          name='locationFilter'
          value='current'
          checked={locationFilter === 'current'}
          onChange={handleLocationFilterChange}
        />
        <Form.Check
          type='radio'
          label='주소로 탐색'
          name='locationFilter'
          value='address'
          checked={locationFilter === 'address'}
          onChange={handleLocationFilterChange}
        />
      </InputGroup>
      {locationFilter === 'current' && (
        <>
          <h2>현재 위치 정보</h2>
          {currentLocation ? (
            <p>
              위도: {currentLocation.latitude}, 경도: {currentLocation.longitude}, 정확도: {currentLocation.accuracy}m
            </p>
          ) : (
            <p>위치 정보를 가져오려면 옵션을 선택하세요.</p>
          )}

          <h2>현재 위치 주소</h2>
          <p>{currentAddress ? currentAddress : '주소 정보 없음'}</p>
        </>
      )}

      {locationFilter === 'address' && (
        <>
          <h2>Google Places Autocomplete</h2>
          <GoogleAddressAutocomplete onSelect={handleLocationSelect} />
        </>
      )}
    </div>
  )
}

export default LocationFetcher
