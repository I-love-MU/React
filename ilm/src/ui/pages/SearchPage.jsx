import { useRef, useState } from 'react'
import { Form, Card, InputGroup, Button } from 'react-bootstrap'
import SpecificLocation from '../components/locationFilter/pointLocation/SpecificLocation'
import CurrentLocationInfo from '../components/locationFilter/currentLocation/CurrentLocationInfo'
import CoordinatesArea from '../../services/CoordinatesArea'
import { OpenApiRealm } from '../../services/OpenApiRealm'

// 진짜 searchpage 에 컴포넌트로 삽입될 위치 기반 탐색 기능
function SearchPage() {
  // 위치 지정 방식
  const [locationFilter, setLocationFilter] = useState('')

  const defaultLocation = {
    selectedCoordinates: { latitude: 37.5720865, longitude: 126.9854332 },
    selectedAddress: null,
  }

  // 검색할 위치
  const [searchLocation, setSearchLocation] = useState(defaultLocation)
  const radiusRef = useRef(null)

  const apiFilter = useRef({
    serviceKey: import.meta.env.VITE_OPENAPI_API_KEY,
    pageNum: '1',
    numOfRow: '10',
    from: '',
    to: '',
    keyword: '',
    sortStdr: '', // (1:등록일, 2:공연명, 3:지역)
    realmCode: '', // (A000: 연극, B000: 음악/콘서트, B002: 국악, C000: 무용/발레, D000: 전시, B003: 뮤지컬/오페라, E000: 아동/가족, F000: 행사/축제, G000: 교육/체험, H000: 도서, I000: 체육, L000: 기타)
    serviceTp: '', // (A:공연/전시, B:행사/축제, C:교육/체험)
  })

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

    apiFilter.current = {
      ...apiFilter.current,
      ...coordinatesArea,
    }

    const searchResult = await OpenApiRealm(apiFilter.current)
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

export default SearchPage
