import React, { useEffect, useState } from 'react'
import { fetchPerformancesByRealm } from '../api/publicApi'
import { Link } from 'react-router-dom'
import { Carousel, Container, Card } from 'react-bootstrap'
import { formatDate } from '../utils'

// 공연 장르 목록과 해당하는 realmCode (API 기준)
const GENRES = [
  { name: '연극', realmCode: 'A000' },
  { name: '콘서트', realmCode: 'B000' },
  { name: '전시', realmCode: 'D000' },
]

const SimplifiedCarousel = () => {
  const [performances, setPerformances] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const from = '20250101'
      const to = '20251231'

      const promises = GENRES.map(async ({ name, realmCode }) => {
        const result = await fetchPerformancesByRealm({
          realmCode,
          from,
          to,
          numOfRows: 1000, // 전체 데이터를 가져온다고 가정
        })

        if (result.length === 0) return null

        // 전체에서 3개 랜덤 선택
        const selectedPerformances = result
          .sort(() => 0.5 - Math.random()) // 랜덤 셔플
          .slice(0, 3) // 상위 3개 선택

        return { genre: name, data: selectedPerformances }
      })

      const results = await Promise.all(promises)

      // key-value 형태로 저장
      const performanceMap = results.reduce((acc, item) => {
        if (item) acc[item.genre] = item.data
        return acc
      }, {})

      setPerformances(performanceMap)
    }

    fetchData()
  }, [])

  return (
    <Container className='mt-5'>
      {GENRES.map(({ name }) => (
        <div key={name} className='mb-5'>
          <h2 className='fw-bold text-center mb-3'>{`지금 인기 있는 ${name}`}</h2>
          <Carousel interval={5000}>
            {performances[name]?.map((performance, idx) => (
              <Carousel.Item key={idx}>
                <Link to={`/performance/${performance.seq}`} className='text-decoration-none text-dark'>
                  <Card className='text-center mx-auto border-0' style={{ maxWidth: '500px' }}>
                    <Card.Img
                      variant='top'
                      src={performance.thumbnail}
                      alt={performance.title}
                      className='img-fluid rounded'
                      style={{ maxHeight: '500px', objectFit: 'cover' }}
                    />
                    <Card.Body>
                      <Card.Title className='mt-3'>{performance.title}</Card.Title>
                      <Card.Text className='text-muted'>
                        {performance.place} <br />
                        {formatDate(String(performance.startDate))} ~ {formatDate(String(performance.endDate))}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      ))}
    </Container>
  )
}

export default SimplifiedCarousel
