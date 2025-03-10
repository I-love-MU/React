import React, { useState, useEffect } from 'react'
import { getFilteredData } from '../../services/ApiService'
import SearchForm from '../components/SearchForm'
import SearchResults from '../components/SearchResults'
import CategoryFilter from '../components/CategoryFilter'

const SearchPage = () => {
  const [displayData, setDisplayData] = useState([]) // 화면에 표시할 데이터 상태
  const [searchStatus, setSearchStatus] = useState({
    isInitiated: false, // 검색이 시작되었는지 여부
    isPending: false,   // 검색이 진행 중인지 여부
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [checkedBox, setCheckedBox] = useState(null)
  const [error, setError] = useState({
    isError: false,
    message: '',
    type: ''
  })

  const realmCode = {
    theatrical: 'A000',
    concerts: 'B000',
    exhibitions: 'D000',
    default: 'D000'
  }

  // API 데이터 호출
  useEffect(() => {
    if (selectedCategory && searchStatus.isPending) {
      const apiKey = import.meta.env.VITE_API_KEY
      const fetchData = async () => {
        // 에러 상태 초기화
        setError({ isError: false, message: '', type: '' })
        
        try {
          const responseData = await getFilteredData(apiKey, 1, 10, selectedCategory, 'A')
          
          // 검색어가 있으면 검색어로 필터링, 없으면 전체 데이터 표시
          if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase()
            const filteredResults = responseData.filter(
              (data) => data.title && data.title.toLowerCase().includes(lowerCaseSearchTerm)
            )
            setDisplayData(filteredResults)
          } else {
            setDisplayData(responseData)
          }
          
          // 검색 상태 업데이트
          setSearchStatus({ isInitiated: true, isPending: false })
        } catch (error) {
          // 에러 처리
          const errorState = {
            isError: true,
            type: 'unknown',
            message: "오류가 발생했습니다"
          }
          
          if (error.response) {
            errorState.type = 'server'
            errorState.message = `서버에서 오류가 발생했습니다 (${error.response.status})`
          } else if (error.request) {
            errorState.type = 'network'
            errorState.message = "서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요."
          } else {
            errorState.type = 'request'
            errorState.message = "요청 설정 중 오류가 발생했습니다"
          }
          
          setError(errorState)
          setSearchStatus(prev => ({ ...prev, isPending: false }))
        }
      }
      
      fetchData()
    }
  }, [selectedCategory, searchStatus.isPending, searchTerm])

  // 검색 처리 함수
  const handleSearch = (term) => {
    setSearchTerm(term)
    
    // 카테고리가 선택되지 않았으면 기본값 설정
    if (!selectedCategory) {
      setSelectedCategory(realmCode.default)
    }
    
    // 검색 상태 업데이트
    setSearchStatus({ isInitiated: true, isPending: true })
  }

  // 카테고리 변경 핸들러
  const handleCategoryChange = (name, isChecked) => {
    // 체크박스 상태 업데이트
    setCheckedBox(isChecked ? name : null)
    setSelectedCategory(isChecked ? realmCode[name] : null)
    
    // 이미 검색이 시작된 상태면 결과 초기화
    if (searchStatus.isInitiated) {
      setDisplayData([])
      setSearchStatus(prev => ({ ...prev, isInitiated: false }))
    }
  }

  const renderContent = () => {

    // 에러가 있는 경우
    if (error.isError) {
      return <div className="error-message">{error.message}</div>
    }
    
    // 검색 중인 경우
    if (searchStatus.isPending) {
      return <p>검색 중입니다...</p>
    }
    
    // 검색 결과가 있는 경우
    if (displayData.length > 0) {
      return <SearchResults filteredData={displayData} />
    }
    
    // 검색 결과가 없는 경우
    return <p>검색 결과가 없습니다.</p>
  }

  return (
    <div className="search-page">
      <CategoryFilter 
        checkedBox={checkedBox} 
        onCategoryChange={handleCategoryChange} 
      />
      
      <SearchForm onSearch={handleSearch} />
      
      <div className='text-center'>
        {renderContent()}
      </div>
    </div>
  )
}

export default SearchPage
