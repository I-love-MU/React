import { useRef, useState } from 'react'
import { Form, Card, InputGroup, Button } from 'react-bootstrap'
import SpecificLocation from './locationFilter/pointLocation/SpecificLocation'
import CurrentLocationInfo from './locationFilter/currentLocation/CurrentLocationInfo'
import CoordinatesArea from '../../services/CoordinatesArea'
import { OpenApiRealm } from '../../services/OpenApiRealm'

// 진짜 searchpage 에 컴포넌트로 삽입될 위치 기반 탐색 기능
function SearchbyLocation({ apiFilter, setSearchResult }) {
  // 위치 지정 방식
  const [locationFilter, setLocationFilter] = useState('')

  const defaultLocation = {
    selectedCoordinates: { latitude: 37.5720865, longitude: 126.9854332 },
    selectedAddress: null,
  }

  // 검색할 위치
  const [searchLocation, setSearchLocation] = useState(defaultLocation)
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

  const handleSearchbyLocation = async () => {
    const coordinatesArea = CoordinatesArea({
      latitude: searchLocation.selectedCoordinates.latitude,
      longitude: searchLocation.selectedCoordinates.longitude,
      radius: radiusRef.current.value,
    })

    const newApiFilter = {
      ...apiFilter,
      ...coordinatesArea,
    }

    try {
      const searchResult = await OpenApiRealm(newApiFilter)
      setSearchResult(searchResult)
    } catch (error) {
      console.error('API 요청 실패:', error)
      setSearchResult(null)
    }
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

      {locationFilter === 'current' && <CurrentLocationInfo onLocationUpdate={handleLocationSelect} />}
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
          탐색
        </Button>
      </InputGroup>
    </>
  )
}

export default SearchbyLocation
