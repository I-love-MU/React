import React, { useEffect, useState } from 'react'
import { fetchOngoingEvents } from '../api/publicApi'
import { useNavigate } from 'react-router-dom'
import { Carousel, Container } from 'react-bootstrap'
import { formatDate } from '../utils' // 날짜 변환 함수 가져오기

const HomeCarousel = () => {
  const [performances, setPerformances] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOngoingEvents({
        from: '20250101',
        to: '20251231',
        numOfRows: 3, // 홈에서는 3개만 표시
      })

      setPerformances(data)
    }

    fetchData()
  }, [])

  return (
    <Container className='mt-5'>
      <Carousel interval={5000}>
        {performances.map((performance) => (
          <Carousel.Item key={performance.seq || Math.random()}>
            {' '}
            {/* key 추가 */}
            <div
              className='text-center'
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/performance/${performance.seq}`)}
            >
              <img
                src={performance.thumbnail}
                alt={performance.title}
                className='img-fluid rounded'
                style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
              />
              <h3 className='mt-3'>{performance.title}</h3>
              <p className='text-muted'>
                {performance.place} <br />
                {formatDate(String(performance.startDate))} ~ {formatDate(String(performance.endDate))}
              </p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  )
}

export default HomeCarousel
