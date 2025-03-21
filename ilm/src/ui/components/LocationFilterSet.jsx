import { useRef, useState } from 'react'
import { Form, Card, InputGroup, Button } from 'react-bootstrap'
import SpecificLocation from './filter/SpecificLocation'
import CurrentLocationInfo from './filter/CurrentLocationInfo'
import CoordinatesArea from '../../services/CoordinatesArea'
import { OpenApiRealm } from '../../services/OpenApiRealm'
// import { getDistanceFromPoint } from '../../services/getDistanceFromPoint'

// 기본 위치 좌표(서울 중심부)
const defaultLocation = {
  selectedCoordinates: { latitude: 37.5720865, longitude: 126.9854332 },
  selectedAddress: '서울',
}

function LocationFilterSet({ updateApiFilter }) {
  // 검색할 위치 지정 방식(현재 위치, 지정 위치)
  const [locationFilter, setLocationFilter] = useState('')

  // 검색할 위치
  const [searchLocation, setSearchLocation] = useState(defaultLocation)

  // 검색할 반경 거리
  const radiusRef = useRef(null)

  const handleLocationFilterChange = (event) => {
    setLocationFilter(event.target.value)
    setSearchLocation(defaultLocation)
  }

  const handleLocationSelect = ({ latitude, longitude, address }) => {
    setSearchLocation({
      selectedCoordinates: { latitude, longitude },
      selectedAddress: address,
    })
  }

  // 버튼 이벤트 핸들러
  const handleSearchbyLocation = async () => {
    // 반경을 통해 위경도 범위를 계산하는 함수
    const coordinatesArea = CoordinatesArea({
      latitude: searchLocation.selectedCoordinates.latitude,
      longitude: searchLocation.selectedCoordinates.longitude,
      radius: radiusRef.current.value,
    })

    updateApiFilter(coordinatesArea)

    // 검색된 컨텐츠의 위치가 반경 내인지 확인하는 코드
    // 검색 컴포넌트 병합 시 검색 결과 출력 컴포넌트에 전이
    // try {
    //   const searchResult = await OpenApiRealm(newApiFilter)
    //   const filteredResults = searchResult.filter((item) => {
    //     const distance = getDistanceFromPoint(
    //       searchLocation.selectedCoordinates.latitude,
    //       searchLocation.selectedCoordinates.longitude,
    //       item.gpsY,
    //       item.gpsX,
    //     )
    //     return distance <= radiusRef.current.value
    //   })
    //   setSearchResult(filteredResults)
    // } catch (error) {
    //   console.error('API 요청 실패:', error)
    //   setSearchResult(null)
    // }
  }

  return (
    <>
      <Form>
        <InputGroup>
          <Form.Check
            type='radio'
            name='locationFilter'
            value='current'
            id='current'
            checked={locationFilter === 'current'}
            onChange={handleLocationFilterChange}
          />
          <Form.Label htmlFor='current'>현재 위치로 탐색</Form.Label>

          <Form.Check
            type='radio'
            name='locationFilter'
            value='address'
            id='address'
            checked={locationFilter === 'address'}
            onChange={handleLocationFilterChange}
          />
          <Form.Label htmlFor='address'>주소로 탐색</Form.Label>
        </InputGroup>
      </Form>

      {locationFilter === 'current' && <CurrentLocationInfo onSelect={handleLocationSelect} />}
      {locationFilter === 'address' && <SpecificLocation onSelect={handleLocationSelect} />}

      {searchLocation.selectedAddress && (
        <Card className='mt-3 p-3'>
          <h4>선택된 주소</h4>
          <p>{searchLocation.selectedAddress}</p>
        </Card>
      )}

      <InputGroup className='mb-3'>
        <InputGroup.Text>반경</InputGroup.Text>
        <Form.Control type='number' aria-label='radius' className='text-end' ref={radiusRef} />
        <InputGroup.Text>km</InputGroup.Text>
        <Button variant='outline-secondary' id='button-addon2' onClick={handleSearchbyLocation}>
          위치 설정
        </Button>
      </InputGroup>
    </>
  )
}

export default LocationFilterSet
