import React, { useEffect, useState } from 'react'
import { fetchPerformancesByRealm } from '../api/publicApi'

const PerformanceListPage = () => {
  const [performances, setPerformances] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date()
      const formattedDate = today.toISOString().split('T')[0].replace(/-/g, '') // YYYYMMDD 변환
      const data = await fetchPerformancesByRealm('B000', formattedDate, formattedDate, 10)
      setPerformances(data)
    }

    fetchData()
  }, [])

  return (
    <div>
      <h2>공연 목록</h2>
      {performances.length > 0 ? (
        <ul>
          {performances.map((performance) => (
            <li key={performance.seq}>{performance.title}</li>
          ))}
        </ul>
      ) : (
        <p>공연 정보를 불러오는 중...</p>
      )}
    </div>
  )
}

export default PerformanceListPage
