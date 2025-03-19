import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchPerformanceData } from '../api/publicApi'

const PerformanceDetailPage = () => {
  const { id } = useParams()
  const [performance, setPerformance] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPerformanceData(id)
      setPerformance(data)
    }

    fetchData()
  }, [id])

  if (!performance) {
    return <p>공연 정보를 불러오는 중...</p>
  }

  return (
    <div className='container mt-5'>
      <h2>{performance.title}</h2>
      <img
        src={performance.thumbnail}
        alt={performance.title}
        className='img-fluid rounded'
        style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
      />
      <p>{performance.description}</p>
      <p>
        <strong>장소:</strong> {performance.place}
      </p>
      <p>
        <strong>날짜:</strong> {performance.startDate} ~ {performance.endDate}
      </p>
    </div>
  )
}

export default PerformanceDetailPage
