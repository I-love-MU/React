import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchPerformanceData } from '../api/publicApi'
import { Container } from 'react-bootstrap'

const PerformanceDetailPage = () => {
  const { id } = useParams() // ✅ URL에서 공연 ID(seq) 가져오기
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
    <Container className='mt-5'>
      <h2>{performance.title}</h2>
      <img
        src={performance.thumbnail}
        alt={performance.title}
        className='img-fluid rounded'
        style={{ width: '100%', maxWidth: '600px' }}
      />
      <p className='text-muted'>
        {performance.place} <br />
        {performance.startDate} ~ {performance.endDate}
      </p>
      <p>{performance.description}</p>
    </Container>
  )
}

export default PerformanceDetailPage
