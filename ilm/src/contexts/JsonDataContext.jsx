import React, {createContext, useState, useEffect} from 'react'
import { XMLParser } from 'fast-xml-parser';
import axios from 'axios'

    const jsonContext = createContext()

    const JsonDataProvider = (props) => {

        const [datas, setData] = useState(null)
        const [error, setError] = useState(null)
        const [realmCode, setCode] = useState([
            {
                theatrical: 'A000',
                concerts: 'B000',
                exhibitions: 'D000',
                default: 'L000'
            }
        ])
        
        const getDate = (serviceKey, pageNum, numOfRow, realmCode, serviceTp) => {
            axios.get(`https://apis.data.go.kr/B553457/nopenapi/rest/publicperformancedisplays/realm?serviceKey=${serviceKey}&PageNo=${pageNum}&numOfrows=${numOfRow}&realmCode=${realmCode}&serviceTp=${serviceTp}`)
            .then((response) => {
                // api 데이터 (XML) 받아오기
                const xmlData = response.data
    
                // XML => JSON
                const parser = new XMLParser({
                    // XML 태그의 속성이 무시되지 않고 변환된 JSON 데이터에 포함
                    ignoreAttributes: false,
                    // 속성 이름에 접두사 추가 (@_)
                    attributeNamePrefix: '@_',
                });
                const jsonData = parser.parse(xmlData)
                console.log(jsonData.response.body.items.item)
                setData(jsonData.response.body.items.item)
            })
            .catch((error) => {
                console.error(error);
                setError('데이터를 불러오는 데 실패했습니다.');
            })  
        }

        // 처음 랜더링 할 때만 api 정보 불러오기
        useEffect(() => {
            const apiKey = import.meta.env.VITE_API_KEY;
            getDate(apiKey, 1, 10, realmCode.map((value) => value.default), 'A') 
        }, [])

        // 에러 상태를 UI로 처리
        if (error) {
            return <div>{error}</div>;
          }

        return (
            <jsonContext.Provider value={{datas}}>
                {props.children}
            </jsonContext.Provider>
        )
    }

export {jsonContext, JsonDataProvider}