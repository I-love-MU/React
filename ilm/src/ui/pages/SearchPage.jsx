import React, { useContext, useState } from 'react';
import { jsonContext } from '../contexts/JsonDataContext';
import { Form, Button } from 'react-bootstrap';
import { getLocation } from '../../services/Geolocation';
import SearchResults from '../components/SearchResults';

const SearchPage = () => {
  const { datas } = useContext(jsonContext) // API 데이터 상태
  const [searchTerm, setSearchTerm] = useState('') // 입력된 검색어 상태
  const [filteredData, setFilteredData] = useState([]) // 필터링된 데이터 상태
  const [isSearched, setIsSearched] = useState(false) // 검색 버튼 클릭 여부 상태
  const [location, setLocation] = useState(null) // 위치 정보 상태

  // 현재 위치 받아오는 함수
  const handleGetLocation = async () => {

    // 검색 결과 초기화
    setIsSearched(false)
    setSearchTerm('')
    setFilteredData([])

    const loc = await getLocation()
    setLocation(loc)
  }


  // 검색 버튼 클릭 시 실행되는 함수
  const handleSearch = () => {
    setIsSearched(true);
    setLocation(null)

    if (datas && datas.length > 0) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const results = datas.filter((data) =>
        data.title && data.title.toLowerCase().includes(lowerCaseSearchTerm)
      );

      setFilteredData(results);
    } else {
      setFilteredData([]); 
    }
  };

  return (
    <div className="text-center mt-5">
      <h2>공공데이터 API 검색 기능</h2>
      <hr />
      {/* 검색 입력 폼 */}
      <Form className="d-flex justify-content-center gap-3 mb-4">
        <Form.Control
          type="text"
          placeholder="콘텐츠 제목을 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
          style={{ width: '300px', marginRight: '10px' }}
        />
        <Button variant="primary" onClick={handleSearch}>검색</Button>
        
        {/* 위치 정보 버튼 */}
        <Button variant="primary" onClick={handleGetLocation}>현재위치</Button>
        </Form>
          {location ? (
            <div className='d-flex justify-content-center'>
              <p>
                위도: {location.latitude}  경도: {location.longitude}
              </p>
            </div>
          ) : (
            <></>
          )}

      {/* 검색 결과 표시 */}
      {isSearched && <SearchResults filteredData={filteredData} />}
    </div>
  );
};

export default SearchPage;