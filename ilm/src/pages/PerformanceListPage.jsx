import React, { useEffect, useState } from 'react'
import { fetchPerformancesByRealm } from '../api/publicApi'
import { useNavigate } from 'react-router-dom'

const PerformanceListPage = () => {
  const [performances, setPerformances] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPerformancesByRealm({
        realmCode: 'B000', // 콘서트 예시
        from: '20250101',
        to: '20251231',
        numOfRows: 10,
      })
      setPerformances(data)
    }

    fetchData()
  }, [])

  return (
    <div className='container mt-5'>
      <h2>공연 목록</h2>
      <div className='row'>
        {performances.length > 0 ? (
          performances.map((performance) => (
            <div key={performance.seq} className='col-md-4 mb-4'>
              <div
                className='card'
                onClick={() => navigate(`/performance/${performance.seq}`)}
                style={{ cursor: 'pointer' }}
              >
                <img src={performance.thumbnail} className='card-img-top' alt={performance.title} />
                <div className='card-body'>
                  <h5 className='card-title'>{performance.title}</h5>
                  <p className='card-text'>
                    {performance.place} <br />
                    {performance.startDate} ~ {performance.endDate}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>공연 정보를 불러오는 중...</p>
        )}
      </div>
    </div>
  )
}

export default PerformanceListPage
