// src/pages/PerformanceDetailPage.jsx

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchPerformanceData } from '../api/publicApi'
import { Container } from 'react-bootstrap'

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

  if (!performance) return <p className='text-center'>🎭 공연 정보를 찾을 수 없습니다.</p>

  return (
    <Container className='mt-4'>
      <h1>{performance.prfnm}</h1>
      <p>
        공연 기간: {performance.prfpdfrom} ~ {performance.prfpdto}
      </p>
      <img src={performance.poster} alt={performance.prfnm} style={{ maxWidth: '100%', borderRadius: '10px' }} />
    </Container>
  )
}

export default PerformanceDetailPage
