import { useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import GoogleAddressAutocomplete from '../services/pointLocation/GoogleAddressAutocomplete'
import CurrentLocationInfo from '../services/currentLocation/CurrentLocationInfo'

function SearchPage() {
  // 필터 상태 관리 (라디오 버튼으로 변경)
  const [locationFilter, setLocationFilter] = useState('')
  const handleLocationFilterChange = (event) => {
    setLocationFilter(event.target.value)
  }

  // GoogleAddressAutocomplete 에서 전달받은 주소(location)를 위경도로 변환
  const coordinates = useRef({ latitude: 37.5720865, longitude: 126.9854332 })
  const handleLocationSelect = ({ latitude, longitude }) => {
    coordinates.current = { latitude, longitude }
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
      <CurrentLocationInfo locationFilter={locationFilter} onLocationUpdate={handleLocationSelect} />

      {locationFilter === 'address' && (
        <>
          <h2>Google Places Autocomplete</h2>
          <GoogleAddressAutocomplete onSelect={handleLocationSelect} />
        </>
      )}
    </>
  )
}

export default SearchPage
