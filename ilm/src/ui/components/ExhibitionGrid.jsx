// src/components/ExhibitionGrid.jsx
import React, { useEffect, useState } from "react"
import { fetchExhibitionData } from "./Fetchdata" // API 함수 import
import { Link } from "react-router-dom"
import { Carousel, Container, Card } from 'react-bootstrap'
import { formatDate, decodetext } from '../../utils'



// ✅ 전시회 데이터를 그리드 형태로 보여주는 컴포넌트
const ExhibitionGrid = () => {
  const [exhibitionItems, setExhibitionItems] = useState([]); // 초기 상태는 빈 배열

  // useEffect를 사용하여 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    const fetchData = async () => {
      const theatre = await fetchExhibitionData("A000");
      const concert = await fetchExhibitionData("B000");
      const exhibition = await fetchExhibitionData("D000");

      const combinedData = [
        { id: "theatre", title: "THEATRE", items: theatre },
        { id: "concert", title: "CONCERT", items: concert },
        { id: "exhibition", title: "EXHIBITION", items: exhibition },
      ];

      setExhibitionItems(combinedData);
    };

    fetchData();
  }, []);



  return (
    <section style={{ padding: "20px" }}>
      {exhibitionItems.map((section) => (
        <div key={section.id} id={section.id} style={{ marginBottom: "40px" }}>
          <h2 style={{ textAlign: "center" }}>{section.title}</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}
          >
            {section.items.map((item, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <Link to={`/detail`} className='text-decoration-none text-dark' state={{ contentNum: item.seq }}>
                  <Card className='text-center mx-auto border-0' style={{ maxWidth: '500px' }}>
                    <Card.Img
                      variant='top'
                      src={item.thumbnail}
                      alt={item.title}
                      className='img-fluid rounded'
                      style={{
                        width: "150px",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <Card.Body>
                      <Card.Title className='mt-3'>{decodetext(item.title) || "제목 없음"}</Card.Title>
                      <Card.Text className='text-muted'>
                        {formatDate(item.startDate)} - {formatDate(item.endDate)}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default ExhibitionGrid;