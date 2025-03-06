import React, { useEffect, useState } from 'react';
import '../css/detailcss.css';
import axios from 'axios';
import xml2js from 'xml-js';

const DetailPage = (contentIdnum = 282960) => {
    const [data, setData] = useState(null);

    // api key
    const apiKey = 'GdRq2wNf3V%2B2XaFCdCiLBhB7feMP3tA7no5CvoII9Mo2QkabR0cQCFR5fGsCxsphvnXhAhy8XnLX1Ep9EYT4HQ%3D%3D';

    // api 데이터 호출.
    useEffect(() => {
        axios
            .get(`https://apis.data.go.kr/B553457/nopenapi/rest/publicperformancedisplays/detail?serviceKey=${apiKey}&seq=${contentIdnum}`, {
                responseType: 'text'
            })
            .then((response) => {
                const result = xml2js.xml2js(response.data, { compact: true });
                const jsonData = result.response.body.items.item;
                const parsedData = Object.keys(jsonData).reduce((acc, key) => {
                    acc[key] = jsonData[key]._text || jsonData[key];
                    return acc;
                }, {});
                setData(parsedData);
                console.log(parsedData);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    if (!data) return <div>Loading...</div>;

    function getUrl(data) {
      return data.url && typeof data.url === "string" ? data.url : data.placeUrl;
  }

    function getContents(data) {
        return data.contents1 && typeof data.contents1 === "string" ? data.contents1 : "해당 공연의 정보가 없습니다.";
    }

    return (
<div id="main">
    <header id="header">
        <h1>EXHIBITION</h1>
    </header>
    <div id='contain'>

    
    <section id="mainContent">
        <h3 id="contentTitle">{data.title}</h3>
        <div class="contentWrapper">
            
            <div id="contentImg">
                <img src={data.imgUrl} alt="이미지 없음" />
            </div>
             
            <div id="contentDetail">
                <h4>상세정보</h4>
                <p><strong>기간 |</strong>  {data.startDate} - {data.endDate}</p>
                <p><strong>장소 |</strong>  {data.place}/{data.area}</p>
                <p><strong>주소 |</strong>  {data.placeAddr}</p>
                <p><strong>관람료 |</strong>  {data.price}</p>
                <p><strong>전화번호 |</strong>  {data.phone}</p>
                <p><strong>사이트 |</strong>  <a href={getUrl(data)} target="_blank" >홈페이지 바로가기</a></p>

            </div>
        </div>
    </section>

    <div id="contentText">
        <p>전시 정보</p>
    </div>

    <section id="contentInfo">
        <div class="infoWrapper">
            
        
            
            <div id="infoText">
                <h4>About</h4>
                <p>{getContents(data.contents1)}</p>
                { data.contents1 === "string" &&<button>READ MORE →</button>}
            </div>
        </div>
    </section>
    </div>
</div>
    );
};

export default DetailPage;

