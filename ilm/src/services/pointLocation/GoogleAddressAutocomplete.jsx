import React, { useState } from 'react'

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

export default function GoogleAddressAutocomplete({ onSelect }) {
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const fetchPlaces = async (query) => {
    if (!query) {
      setSuggestions([])
      return
    }

    const response = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
      },
      body: JSON.stringify({
        input: query,
      }),
    })

    const data = await response.json()
    if (data.suggestions) {
      setSuggestions(data.suggestions)
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
