import React, { useEffect, useState } from 'react'
import { fetchPerformancesByRealm } from '../api/publicApi' // ✅ 올바르게 import

const PerformanceListPage = () => {
  const [performances, setPerformances] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPerformancesByRealm('B000') // 콘서트 데이터 예시
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
