import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'

const KeywordFilter = ({ updateApiFilter }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchTermChange = (e) => {
    const newSearchTerm = e.target.value
    setSearchTerm(newSearchTerm)
  }

  useEffect(() => {
    updateApiFilter({ keyword: searchTerm })
  }, [searchTerm])

  return (
    <Form.Control
      type='text'
      placeholder='공연 이름을 입력하세요'
      value={searchTerm}
      onChange={handleSearchTermChange}
      className='me-2'
      style={{ width: '300px', marginRight: '10px' }}
    />
  )
}

export default KeywordFilter
