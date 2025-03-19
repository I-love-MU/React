import { useState } from 'react'
import { Form, ListGroup, Card, Container } from 'react-bootstrap'
import { GoogleAddresstoCoordinates } from '../../../services/pointLocation/GoogleAddresstoCoordinates'
import { GooglePlacesAutocomplete } from '../../../services/pointLocation/GooglePlacesAutocomplete'

export default function SpecificLocation({ onSelect }) {
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const handleInputChange = async (event) => {
    const query = event.target.value
    setInput(query)
    const places = await GooglePlacesAutocomplete(query)
    setSuggestions(places)
  }

  const handleSelect = async (place) => {
    const coordinates = await GoogleAddresstoCoordinates(place.placeId)
    setInput(place.text.text)
    onSelect({ latitude: coordinates.latitude, longitude: coordinates.longitude, address: place.text.text })
    setSuggestions([])
  }

  return (
    <>
      <Container className='mt-3'>
        <Form.Group>
          <Form.Control
            type='text'
            value={input}
            onChange={handleInputChange}
            placeholder='Search places...'
            className='location-search-input'
          />
        </Form.Group>
        {suggestions.length > 0 && (
          <Card className='mt-2'>
            <ListGroup variant='flush'>
              {suggestions.map((suggestion, index) => (
                <ListGroup.Item key={index} action onClick={() => handleSelect(suggestion.placePrediction)}>
                  {suggestion.placePrediction.text.text}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        )}
      </Container>
    </>
  )
}
