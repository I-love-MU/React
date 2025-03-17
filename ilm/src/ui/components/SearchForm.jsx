import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { getFilteredData } from '../../services/ApiService'

const SearchForm = ({ onSearch, onSearchResults, apiFilter, searchStatus }) => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault() // Form 태그 페이지 새로고침 방지
    
    // 부모 컴포넌트의 검색 함수 호출
    onSearch(searchTerm)
    
    try {
      // API 호출
      const responseData = await getFilteredData(
        apiFilter.serviceKey,
        apiFilter.pageNum,
        apiFilter.numOfRow,
        apiFilter.realmCode,
        apiFilter.serviceTp,
        apiFilter.from,
        apiFilter.to
      )
      
      console.log('API 응답 데이터:', responseData)
      
      // 검색 결과를 부모 컴포넌트로 전달
      onSearchResults(responseData)
      
    } catch (error) {
      // 에러 처리
      let errorInfo = {
        isError: true,
        type: 'unknown',
        message: '알 수 없는 오류가 발생했습니다.'
      }
      
      if (error.response) {
        errorInfo.type = 'server'
        errorInfo.message = `서버에서 오류가 발생했습니다 (${error.response.status})`
      } else if (error.request) {
        errorInfo.type = 'network'
        errorInfo.message = "서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요."
      } else {
        errorInfo.type = 'request'
        errorInfo.message = "요청 설정 중 오류가 발생했습니다"
      }
      
      onSearchResults([], errorInfo)
    }
  }
  
  return (
    <Form onSubmit={handleSubmit} className="d-flex justify-content-center mb-5 gap-3">
      <Form.Control
        type="text"
        placeholder="공연 이름을 입력하세요"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="me-2"
        style={{ width: '300px', marginRight: '10px' }}
      />
      <Button 
        variant="primary" 
        type="submit"
        disabled={searchStatus.isPending}
      >
        검색
      </Button>
    </Form>
  )
}

export default SearchForm
