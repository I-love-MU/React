import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { getFilteredData } from '../../services/ApiService'

const SearchForm = ({ onSearch, selectedCategory }) => {

  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault() // Form 태그 페이지 새로고침 방지
    setIsLoading(true)
    
    try {
      const apiKey = import.meta.env.VITE_API_KEY
      
      // API 서비스를 통해 데이터 요청
      const responseData = await getFilteredData(apiKey, 1, 10, selectedCategory, 'A')
      
      // 검색어가 있으면 검색어로 필터링, 없으면 전체 데이터 전달
      if (searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase()
        const filteredResults = responseData.filter(
          (data) => data.title && data.title.toLowerCase().includes(lowerCaseSearchTerm)
        )
        onSearch(searchTerm, filteredResults)
      } else {
        onSearch(searchTerm, responseData)
      }
    } catch (error) {
      // 에러 발생 시 빈 배열 전달
      onSearch(searchTerm, [], error)
    } finally {
      setIsLoading(false)
    }
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
      <Button variant="primary" type="submit" disabled={isLoading}>
        검색
      </Button>
    </Form>
  );
};

export default SearchForm;
