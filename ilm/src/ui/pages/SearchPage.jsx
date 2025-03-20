import React, { useState, useRef } from 'react'
import SearchForm from '../components/SearchForm'
import SearchResults from '../components/SearchResults'
import { Card, Container, Row, Col, Spinner } from 'react-bootstrap'

const SearchPage = () => {
  // 검색 결과 데이터 상태
  const [displayData, setDisplayData] = useState([])

  // 검색 상태
  const [searchStatus, setSearchStatus] = useState({
    isInitiated: false,
    isPending: false,
  })

  // 에러처리 상태
  const errorRef = useRef({
    isError: false,
    message: '',
    type: '',
  })

  // 검색 처리 함수 - 검색 버튼 클릭 시 호출
  const handleSearch = () => {
    // 검색 시작 - API 호출 트리거
    setSearchStatus({
      isInitiated: true,
      isPending: true,
    })
  }

  // 검색 결과 처리 함수 - SearchForm에서 호출됨
  const handleSearchResults = (results, error = null) => {
    if (error) {
      errorRef.current = {
        isError: true,
        message: error.message,
        type: error.type,
      }
    } else {
      errorRef.current = {
        isError: false,
        message: '',
        type: '',
      }

      // API에서 이미 필터링된 결과를 받아오므로 추가 필터링 없이 결과 표시
      setDisplayData(results)
    }

    // 검색 상태 업데이트
    setSearchStatus({
      isInitiated: true,
      isPending: false,
    })
  }

  const renderContent = () => {
    // 에러가 있는 경우
    if (errorRef.current.isError) {
      return (
        <Card className='text-center'>
          <Card.Body>
            <Card.Title className='text-danger'>오류 발생</Card.Title>
            <Card.Text>{errorRef.current.message}</Card.Text>
          </Card.Body>
        </Card>
      )
    }

    // 검색 중인 경우 Spinner 표시
    if (searchStatus.isPending) {
      return (
        <Spinner animation='border' role='status' variant='dark'>
          <span className='visually-hidden'>검색 중...</span>
        </Spinner>
      )
    }

    // 검색 결과가 있는 경우
    if (searchStatus.isInitiated) {
      return <SearchResults filteredData={displayData} />
    }

    return null
  }

  return (
    <Container className='mt-4'>
      <h1 className='text-start mb-4'>
        <strong>Search</strong>
      </h1>

      {/* SearchForm 가운데 배치 */}
      <Row className='justify-content-center mb-4'>
        <Col className='text-center'>
          <SearchForm
            onSearch={handleSearch}
            onSearchResults={handleSearchResults}
            searchStatus={searchStatus.isPending ? 'loading' : 'idle'}
          />
        </Col>
      </Row>

      {/* 검색 결과 출력 */}
      <Row className='text-center'>
        <Col>{renderContent()}</Col>
      </Row>
    </Container>
  )
}

export default SearchPage
