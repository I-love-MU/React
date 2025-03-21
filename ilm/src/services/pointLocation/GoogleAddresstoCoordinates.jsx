import axios from 'axios'

export const GoogleAddresstoCoordinates = async (placeId) => {
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${GOOGLE_MAPS_API_KEY}`,
    )

    if (response.data.status === 'OK' && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location
      return { latitude: location.lat, longitude: location.lng }
    } else {
      console.error('Failed to fetch coordinates:', response.data.status)
      return null
    }
  } catch (error) {
    console.error('Error fetching coordinates from place_id:', error)
    return null
  }
}
