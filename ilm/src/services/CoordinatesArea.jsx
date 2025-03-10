import { useState } from 'react'

const CoordinatesArea = ({ latitude, longitude, radius }) => {
  const [bounds, setBounds] = useState(null)

  const latOffset = radius / 111.32 // 위도의 변화량 (고정값)
  const lonOffset = radius / (111.32 * Math.cos(latitude * (Math.PI / 180))) // 경도의 변화량

  const minLat = latitude - latOffset
  const maxLat = latitude + latOffset
  const minLon = longitude - lonOffset
  const maxLon = longitude + lonOffset

  setBounds({
    minLat: minLat,
    minLon: minLon,
    maxLat: maxLat,
    maxLon: maxLon,
  })

  return bounds
}

export default CoordinatesArea
