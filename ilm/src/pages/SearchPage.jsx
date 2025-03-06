import React, { useContext } from 'react'
import { jsonContext } from '../context/JsonDataContext'

const SearchPage = () => {

    const {datas} = useContext(jsonContext)

    return (
        <div className='text-center mt-5'>
            <h2>공공데이터 api 받아오기.</h2>
            <hr />
            {   datas && datas.length > 0 ? (
                    datas.map((data, index) => (
                        <div key={index}>
                            <li>
                                <h3>제목: {data.title}</h3>
                                <p>장소: {data.place}</p>
                                <p>기간: {data.startDate} ~ {data.endDate}</p>
                                <p>분류이름: {data.realmName}</p>
                                <p>장소: {data.place}</p>
                                <p>분류목록: {data.serviceName}</p>
                            </li>
                        </div>
                    ))
                ) : (
                    <p>데이터를 불러오는 중이거나 데이터가 없습니다.</p>
                )
            }
        </div>
    )
}

export default SearchPage