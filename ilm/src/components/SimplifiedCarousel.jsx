import React, { useEffect, useState } from 'react'
import { OpenApiRealm } from '../services/ApiService'
import { Link } from 'react-router-dom'
import { Carousel, Container, Card } from 'react-bootstrap'
import { formatDate, decodetext } from '../utils'

const GENRES = [
  { name: '연극', realmCode: 'A000' },
  { name: '콘서트', realmCode: 'B000' },
  { name: '전시', realmCode: 'D000' },
]

const SimplifiedCarousel = () => {
  const [performances, setPerformances] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const key = import.meta.env.VITE_API_DECODE_KEY

        if (!key) {
          throw new Error('API 키가 설정되지 않았습니다.')
        }

        const results = await Promise.all(
          GENRES.map(async ({ name, realmCode }) => {
            try {
              const result = await OpenApiRealm({
                serviceKey: key,
                realmCode,
                from: '20250101',
                to: '20251231',
                numOfRows: 10,
              })

              if (!result || result.length === 0) {
                console.log(`${name} 장르의 공연 정보가 없습니다.`)
                return null
              }

              const selectedPerformances = result.sort(() => 0.5 - Math.random()).slice(0, 3)

              return { genre: name, data: selectedPerformances }
            } catch (error) {
              console.error(`${name} 데이터 가져오기 실패`, error)
              return null
            }
          }),
        )

        const performanceMap = results.reduce((acc, item) => {
          if (item) acc[item.genre] = item.data
          return acc
        }, {})

        setPerformances(performanceMap)
      } catch (error) {
        console.error('데이터 가져오기 실패:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <Container className='mt-5'>
      {/* 왼쪽/오른쪽 화살표 및 인디케이터 색상 회색 처리 */}
      <style>
        {`
          .carousel-control-prev-icon,
          .carousel-control-next-icon {
            background-image: none;
          }

          .carousel-control-prev-icon::after,
          .carousel-control-next-icon::after {
            content: '';
            display: inline-block;
            width: 0.6rem;
            height: 0.6rem;
            border: solid #6c757d;
            border-width: 0 0.3rem 0.3rem 0;
            padding: 10px;
          }

          .carousel-control-prev-icon::after {
            transform: rotate(135deg);
          }

          .carousel-control-next-icon::after {
            transform: rotate(-45deg);
          }

          .carousel-indicators [data-bs-target] {
            background-color: #6c757d;
          }
        `}
      </style>

      {GENRES.map(({ name }) => (
        <div key={name} className='mb-5'>
          <h2 className='fw-bold text-center mb-3'>{`지금 인기 있는 ${name}`}</h2>
          <Carousel interval={5000}>
            {performances[name]?.map((performance, idx) => (
              <Carousel.Item key={idx}>
                <Link to={`/detail`} className='text-decoration-none text-dark' state={{ contentNum: performance.seq }}>
                  <Card className='text-center mx-auto border-0' style={{ maxWidth: '500px' }}>
                    <Card.Img
                      variant='top'
                      src={performance.thumbnail}
                      alt={performance.title}
                      className='img-fluid rounded'
                      style={{ maxHeight: '500px', objectFit: 'cover' }}
                    />
                    <Card.Body>
                      <Card.Title className='mt-3'>{decodetext(performance.title)}</Card.Title>
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
