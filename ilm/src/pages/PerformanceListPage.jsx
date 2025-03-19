import React, { useEffect, useState } from 'react'
import { fetchPerformancesByRealm } from '../api/publicApi'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'

const PerformanceListPage = () => {
  const [performances, setPerformances] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPerformancesByRealm({
        realmCode: 'B000', // 콘서트 예시
        from: '20250101',
        to: '20251231',
        numOfRows: 12, // 12개 가져오기
      })
      setPerformances(data)
    }

    fetchData()
  }, [])

  return (
    <Container className='mt-5'>
      <h2 className='text-center mb-4'>공연 목록</h2>
      <Row>
        {performances.length > 0 ? (
          performances.map((performance) => (
            <Col key={performance.seq} md={4} lg={3} className='mb-4'>
              <Card
                className='shadow-sm h-100'
                onClick={() => navigate(`/performance/${performance.seq}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className='poster-container'>
                  <Card.Img variant='top' src={performance.thumbnail || '/default-image.jpg'} className='poster-img' />
                </div>
                <Card.Body className='text-center'>
                  <Card.Title className='text-truncate' title={performance.title}>
                    {performance.title}
                  </Card.Title>
                  <Card.Text className='text-muted'>
                    {performance.place} <br />
                    {performance.startDate} ~ {performance.endDate}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className='text-center w-100'>공연 정보를 불러오는 중...</p>
        )}
      </Row>
    </Container>
  )
}

export default PerformanceListPage
