import React, { useState, useEffect } from 'react'
import { getFilteredData } from '../../services/ApiService'
import SearchResults from '../components/SearchResults'
import SearchForm from '../components/SearchForm'

const SearchPage = () => {
  const [datas, setData] = useState(null) // api 데이터 상태
  const [isSearched, setIsSearched] = useState(false); // 검색 버튼 클릭 여부 상태
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터 상태


  // api 데이터 호출
  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY
    const fetchData = async () => {
      try {
        const responseData = await getFilteredData(apiKey, 1, 10, 'D000', 'A')
        console.log('API 응답 데이터', responseData)
        setData(responseData)
      } catch (error) {
        console.error('API 호출 중 오류: ', error)
      } 
    }
    fetchData();
  }, [])


  // 검색 처리 함수
  const handleSearch = (searchTerm) => {
    setIsSearched(true);
    if (datas && datas.length > 0) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const results = datas.filter(
        (data) => data.title && data.title.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setFilteredData(results)
    } else {
      setFilteredData([]) // 데이터가 없으면 빈 배열로 설정
    }
  };

  return (
    <div className='text-center mt-5'>
        <h2>공공데이터 API 검색 기능</h2>
        <hr />
        {/* 검색 입력 폼*/}
        <SearchForm onSearch={handleSearch} />

        {/*검색 결과 표시*/}
        {isSearched && <SearchResults filteredData={filteredData} />}
    </div>
  );
};

export default SearchPage;
