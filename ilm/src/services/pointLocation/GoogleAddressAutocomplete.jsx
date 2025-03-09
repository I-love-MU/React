import React, { useState } from 'react'
import axios from 'axios'

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

  const handleSelect = (place) => {
    setInput(place.text.text)
    onSelect(place)
    setSuggestions([])
  }

  return (
    <div>
      <input
        type='text'
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
          fetchPlaces(e.target.value)
        }}
        placeholder='Search places...'
        className='location-search-input'
      />
      <div className='autocomplete-dropdown-container'>
        {suggestions.map((suggestion, index) => (
          <div key={index} className='suggestion-item' onClick={() => handleSelect(suggestion.placePrediction)}>
            {suggestion.placePrediction.text.text}
          </div>
        ))}
      </div>
    </div>
  )
}
