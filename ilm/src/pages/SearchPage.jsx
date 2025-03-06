import { useState, useRef, useCallback, useEffect } from 'react'
import { getLocation } from '../services/Geolocation'
import { getAddressFromCoordinates } from '../services/GoogleMapsAddress'
import { InputGroup, Form, Button } from 'react-bootstrap'

function LocationFetcher() {
  // 필터 상태를 useState로 관리 (체크박스 UI 반영을 위해)
  const [useCurrentLocationFilter, setUseCurrentLocationFilter] = useState(false)
  const [useAddressFilter, setUseAddressFilter] = useState(false)

  // 위치 정보 및 주소 데이터를 useRef로 관리
  const [currentLocation, setCurrentLocation] = useState(null)
  const [currentAddress, setCurrentAddress] = useState(null)
  const inputAddress = useRef('')

  // 체크박스 상태 변경 핸들러
  const handleCurrentLocationFilterChange = (event) => {
    setUseCurrentLocationFilter(event.target.checked)
  }

  const handleAddressFilterChange = (event) => {
    setUseAddressFilter(event.target.checked)
  }

  const handleAddressChange = (event) => {
    inputAddress.current = event.target.value
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

  // 체크박스가 체크될 때마다 현재 위치 조회
  useEffect(() => {
    if (useCurrentLocationFilter) {
      fetchCurrentLocationAndAddress()
    }
  }, [useCurrentLocationFilter, fetchCurrentLocationAndAddress])

  return (
    <div>
      <h2>현재 위치 정보</h2>
      {currentLocation ? (
        <p>
          위도: {currentLocation.latitude}, 경도: {currentLocation.longitude}, 정확도: {currentLocation.accuracy}m
        </p>
      ) : (
        <p>위치 정보를 가져오려면 버튼을 클릭하거나 체크박스를 선택하세요.</p>
      )}

      <h2>현재 위치 주소</h2>
      <p>{currentAddress ? currentAddress : '주소 정보 없음'}</p>

      <InputGroup className='mb-3'>
        <InputGroup.Checkbox checked={useCurrentLocationFilter} onChange={handleCurrentLocationFilterChange} />
        <Form.Label className='ms-2'>현재 위치로 탐색</Form.Label>
        <InputGroup.Checkbox checked={useAddressFilter} onChange={handleAddressFilterChange} />
        <Form.Label className='ms-2'>주소로 탐색</Form.Label>
      </InputGroup>

      <Form.Control
        type='text'
        placeholder='탐색할 주소를 입력하세요'
        defaultValue={inputAddress.current}
        onChange={handleAddressChange}
        disabled={!useAddressFilter} // 체크 여부에 따라 활성화/비활성화
        className='mb-3'
      />
    </div>
  )
}

export default LocationFetcher
