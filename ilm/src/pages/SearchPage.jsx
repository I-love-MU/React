import { useState } from 'react'
import { Form, Card, InputGroup } from 'react-bootstrap'
import SpecificLocation from '../components/locationFilter/pointLocation/SpecificLocation'
import CurrentLocationInfo from '../components/locationFilter/currentLocation/CurrentLocationInfo'

function SearchPage() {
  // 위치 지정 방식
  const [locationFilter, setLocationFilter] = useState('')

  const defaultLocation = {
    selectedCoordinates: { latitude: 37.5720865, longitude: 126.9854332 },
    selectedAddress: null,
  }

  // 검색할 위치
  const [searchLocation, setSearchLocation] = useState(defaultLocation)

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
        <Form.Control type='number' aria-label='radius' className='text-end' />
        <InputGroup.Text>km</InputGroup.Text>
      </InputGroup>
    </>
  )
}

export default SearchPage
