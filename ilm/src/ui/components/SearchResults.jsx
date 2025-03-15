import React from 'react'

const SearchResults = ({ filteredData }) => {
  return (
    <div>
        {filteredData && filteredData.length > 0 ? (
            filteredData.map((data, index) => (
                <div key={index} className='mb-3'>
                    <h3>{data.title}</h3>
                    <p>장소: {data.place}</p>
                    <p>기간: {data.startDate} ~ {data.endDate}</p>
                    <p>분류이름: {data.realmName}</p>
                    <p>분류목록: {data.serviceName}</p>
                </div>
            ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
    </div>
  )
}

export default SearchResults
