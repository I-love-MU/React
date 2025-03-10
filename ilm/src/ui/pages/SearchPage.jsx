import React, { useState, useEffect } from 'react'
import { getFilteredData } from '../../services/ApiService'
import SearchResults from '../components/SearchResults'
import Form from 'react-bootstrap/Form';

const SearchPage = () => {
  const [datas, setData] = useState(null) // api 데이터 상태
  const [selectedCategory, setSelectedCategory] = useState(null); // 체크박스 조건 선택 여부 상태
  const [checkedBox, setCheckedBox] = useState(null); // 현재 체크된 박스 이름

  const realmCode = {  // 카테고리 분류 코드
    theatrical: 'A000',
    concerts: 'B000',
    exhibitions: 'D000',
  };

  // api 데이터 호출
  useEffect(() => {
    if (setSelectedCategory) {
      const apiKey = import.meta.env.VITE_API_KEY
      const fetchData = async () => {
        try {
          const responseData = await getFilteredData(apiKey, 1, 10, selectedCategory, 'A')
          console.log('API 응답 데이터', responseData)
          setData(responseData)
        } catch (error) {
          console.error('API 호출 중 오류: API_KEY 값을 입력해 주세요. ', error)
          if (error.response) {
            console.log('응답 오류:', error.response.status, error.response.data)
          } else if (error.request) {
            console.log('요청 오류:', error.request)
          } else {
            console.log('기타 오류:', error.message)
          }
        } 
      }
      fetchData()
    }
  }, [selectedCategory])


    // 카테고리 변경 핸들러
  const handleCategoryFilter = (e) => {
    const name = e.target.name;
    const isChecked = e.target.checked;
    
    if (isChecked) {
      // 체크된 경우 해당 박스만 선택
      setCheckedBox(name);
      setSelectedCategory(realmCode[name]);
    } else {
      // 체크 해제된 경우 선택 초기화
      setCheckedBox(null);
      setSelectedCategory(null);
    }
  };

  return (
    <div className="search-page">
      <div className="filter-section text-center mt-5">
        <h2>카테고리 필터</h2>
        <hr />
        <Form className="d-flex justify-content-center align-items-center">
          <Form.Check
            type="checkbox"
            id="theatrical"
            name="theatrical"
            label="연극"
            onChange={handleCategoryFilter}
            checked={checkedBox === 'theatrical'}
            className="mx-2"
          />
          <Form.Check
            type="checkbox"
            id="concerts"
            name="concerts"
            label="음악/콘서트"
            onChange={handleCategoryFilter}
            checked={checkedBox === 'concerts'}
            className="mx-2"
          />
          <Form.Check
            type="checkbox"
            id="exhibitions"
            name="exhibitions"
            label="전시"
            onChange={handleCategoryFilter}
            checked={checkedBox === 'exhibitions'}
            className="mx-2"
          />
        </Form>
      </div>

      <div className='results-section text-center mt-4'>
        {/* 검색 결과 표시 */}
        <SearchResults filteredData={datas}/>
      </div>
  </div>
  )

}

export default SearchPage;