import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchForm = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault() // Form 태그 페이지 새로고침 방지
    onSearch(searchTerm)
  }

  return (
    <Form onSubmit={handleSubmit} className="d-flex justify-content-center mb-5">
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="컨텐츠 제목을 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '300px', marginRight: '10px' }}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        검색
      </Button>
    </Form>
  );
};

export default SearchForm
