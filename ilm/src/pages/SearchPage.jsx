import { useState } from 'react'
import { Form, Card } from 'react-bootstrap'
import GoogleAddressAutocomplete from '../components/locationFilter/pointLocation/SpecificLocation'
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
      </Form>

      {locationFilter === 'current' && <CurrentLocationInfo onLocationUpdate={handleLocationSelect} />}
      {locationFilter === 'address' && <GoogleAddressAutocomplete onSelect={handleLocationSelect} />}

      {searchLocation.selectedAddress && (
        <Card className='mt-3 p-3'>
          <h4>선택된 주소</h4>
          <p>{searchLocation.selectedAddress}</p>
        </Card>
      )}
    </>
  )
}

export default SearchPage
