import axios from 'axios'

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

export const GooglePlacesAutocomplete = async (query) => {
  if (!query) return []

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

    return response.data.suggestions || []
  } catch (error) {
    console.error('Error fetching places:', error)
    return []
  }
}
