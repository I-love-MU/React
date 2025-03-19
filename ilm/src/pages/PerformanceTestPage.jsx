// src/pages/PerformanceTestPage.jsx
import React, { useEffect, useState } from 'react'
import { fetchOngoingEvents } from '../api/publicApi'

const PerformanceTestPage = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOngoingEvents({
        from: '20190616',
        to: '20191231',
        serviceTp: 'A', // 공연/전시
        numOfRows: 10,
        keyword: '토비아스',
        gpsxfrom: 128.9427422591895,
        gpsyfrom: 35.10921642590141,
        gpsxto: 128.9427422591895,
        gpsyto: 35.10921642590141,
      })
      setEvents(data)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h2>공연 테스트 페이지</h2>
      {events.length > 0 ? (
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              <h3>{event.title}</h3>
              <p>
                기간: {event.startDate} ~ {event.endDate}
              </p>
              <p>장소: {event.place}</p>
              {event.thumbnail && <img src={event.thumbnail} alt={event.title} style={{ width: '200px' }} />}
            </li>
          ))}
        </ul>
      ) : (
        <p>데이터를 불러오는 중...</p>
      )}
    </div>
  )
}

export default PerformanceTestPage
