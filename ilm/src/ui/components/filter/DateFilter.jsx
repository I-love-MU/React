import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Container } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const DateFilter = ({ updateApiFilter }) => {
  const [dateFilter, setDateFilter] = useState({
    startDate: '',
    endDate: '',
  })

  const handleDateChange = (date, type) => {
    setDateFilter((prev) => ({
      ...prev,
      [type]: date,
    }))
  }

  useEffect(() => {
    updateApiFilter({
      from: formatDateForApi(dateFilter.startDate),
      to: formatDateForApi(dateFilter.endDate),
    })
  }, [dateFilter])

  // 날짜를 'YYYYMMDD' 형식으로 변환하는 함수
  const formatDateForApi = (date) => {
    if (!date) return ''
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}${month}${day}`
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>시작일</Form.Label>
            <DatePicker
              selected={dateFilter.startDate}
              onChange={(date) => handleDateChange(date, 'startDate')}
              selectsStart
              startDate={dateFilter.startDate}
              endDate={dateFilter.endDate}
              dateFormat='yyyy-MM-dd'
              className='form-control'
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>종료일</Form.Label>
            <DatePicker
              selected={dateFilter.endDate}
              onChange={(date) => handleDateChange(date, 'endDate')}
              selectsEnd
              startDate={dateFilter.startDate}
              endDate={dateFilter.endDate}
              minDate={dateFilter.startDate}
              dateFormat='yyyy-MM-dd'
              className='form-control'
            />
          </Form.Group>
        </Col>
      </Row>
    </Container>
  )
}

export default DateFilter
