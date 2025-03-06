import React, { useContext, useState } from 'react';
import { jsonContext } from '../contexts/JsonDataContext';
import { Form, Button } from 'react-bootstrap';
import SearchResults from '../components/SearchResults';

const SearchPage = () => {
  const { datas } = useContext(jsonContext); // Context에서 데이터를 가져옴
  const [searchTerm, setSearchTerm] = useState(''); // 입력된 검색어 상태
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터 상태
  const [isSearched, setIsSearched] = useState(false); // 검색 버튼 클릭 여부 상태

  // 검색 버튼 클릭 시 실행되는 함수
  const handleSearch = () => {
    setIsSearched(true); // 검색 버튼이 눌렸음을 기록
    if (datas && datas.length > 0) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const results = datas.filter((data) =>
        data.title && data.title.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setFilteredData(results);
    } else {
      setFilteredData([]); // 데이터가 없으면 빈 배열로 설정
    }
  };

  return (
    <div className="text-center mt-5">
      <h2>공공데이터 API 검색 기능</h2>
      <hr />
      {/* 검색 입력 폼 */}
      <Form className="d-flex justify-content-center mb-4">
        <Form.Control
          type="text"
          placeholder="콘텐츠 제목을 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // 입력값 업데이트
          style={{ width: '300px', marginRight: '10px' }}
        />
        <Button variant="primary" onClick={handleSearch}>
          검색
        </Button>
      </Form>

      {/* 검색 결과 표시 */}
      {isSearched && <SearchResults filteredData={filteredData} />}
    </div>
  );
};

export default SearchPage;