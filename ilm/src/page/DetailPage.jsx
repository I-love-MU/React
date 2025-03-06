import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import GetData from '../detail/GetData';
import '../detail/detailcss.css';

const DetailPage = () => {
    const data = GetData(308343).props.children
    console.log(data)
   

    if (!data) return <div>Loading...</div>;

    function getUrl(data) {
        return data.url ? data.url : data.placeUrl;
    }

    function getContents(data) {
        return data.contents ? data.contents : "Lorem Ipsum is simply dummy text of the printing and typesetting industry...";
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
                <p><strong>사이트 |</strong>  <a href={getUrl(data)}>홈페이지 바로가기</a></p>
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
                { data.contents1&&<button>READ MORE →</button>}
            </div>
        </div>
    </section>
    </div>
</div>


    );
};

export default DetailPage;


//GdRq2wNf3V%2B2XaFCdCiLBhB7feMP3tA7no5CvoII9Mo2QkabR0cQCFR5fGsCxsphvnXhAhy8XnLX1Ep9EYT4HQ%3D%3D
//GdRq2wNf3V+2XaFCdCiLBhB7feMP3tA7no5CvoII9Mo2QkabR0cQCFR5fGsCxsphvnXhAhy8XnLX1Ep9EYT4HQ==