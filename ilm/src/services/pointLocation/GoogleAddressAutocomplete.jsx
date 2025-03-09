import React, { useState } from 'react'
import axios from 'axios'
import { GoogleAddresstoCoordinates } from './GoogleAddresstoCoordinates'
import { Form, ListGroup, Card, Container } from 'react-bootstrap'

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

export default function GoogleAddressAutocomplete({ onSelect }) {
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const fetchPlaces = async (query) => {
    if (!query) {
      setSuggestions([])
      return
    }

    try {
      const response = await axios.post(
        'https://places.googleapis.com/v1/places:autocomplete',
        { input: query },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
          },
        },
      )

      if (response.data.suggestions) {
        setSuggestions(response.data.suggestions)
      }
    } catch (error) {
      console.error('Error fetching places:', error)
    }
  }

  const handleSelect = async (place) => {
    const coordinates = await GoogleAddresstoCoordinates(place.placeId)
    setInput(place.text.text)
    onSelect(coordinates)
    setSuggestions([])
  }

  return (
    <>
      <Container className='mt-3'>
        <Form.Group>
          <Form.Control
            type='text'
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              fetchPlaces(e.target.value)
            }}
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
