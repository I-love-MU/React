import React, { useState, useEffect } from 'react'
import { getFilteredData } from '../../services/ApiService'

const SearchPage = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      const apiKey = import.meta.env.VITE_API_KEY
      const fetchData = async () => {
        try {
          const responseData = await getFilteredData(apiKey, 1, 10, 'D000', 'A')
          console.log('API 응답 데이터', responseData)
          setData(responseData)
        } catch (error) {
          console.error('API 호출 중 오류: ', error)
        } finally {
          setLoading(false)
        }
      };
      fetchData();
    }, []);
  
    if (loading) return <div>데이터를 불러오는 중입니다...</div>;
    if (!data || data.length === 0) return <div>데이터가 없습니다.</div>;
  
    return (
      <div className='text-center mt-5'>
          <h2>공공데이터 api 받아오기.</h2>
          <hr />
          {data.map((item, index) => (
              <div key={index} className="data-item">
              <h3>{item.title}</h3>
              <p>장소: {item.place}</p>
              <p>기간: {item.startDate} ~ {item.endDate}</p>
              <p>분류이름: {item.realmName}</p>
              <p>분류목록: {item.serviceName}</p>
              </div>
          ))}
      </div>
    );
  };
  
  export default SearchPage;