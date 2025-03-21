import React, { useEffect, useState } from "react";
import { fetchExhibitionData } from "./Fetchdata"; // API 함수 import



// ✅ 전시회 데이터를 그리드 형태로 보여주는 컴포넌트
const ExhibitionGrid = () => {
  const [exhibitionItems, setExhibitionItems] = useState([]); // 초기 상태는 빈 배열
// useEffect를 사용하여 컴포넌트가 마운트될 때 API 호출
  
  useEffect(() => {
    const fetchData = async () => {
      const theatre = await fetchExhibitionData("A000");
      const concert = await fetchExhibitionData("B000");
      const exhibition = await fetchExhibitionData("D000");

      const combinedData = [...theatre, ...concert, ...exhibition];
     
      setExhibitionItems(combinedData);
    };

    fetchData();
  }, []);
   
  return (
    <section style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", padding: "20px" }}>
      {exhibitionItems.length > 0 ? (
        exhibitionItems.map((item, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            <img
              src={item.poster || "https://via.placeholder.com/150"} // 기본 이미지 설정
              alt={item.title || "제목 없음"}
              style={{
                width: "150px", // 고정된 너비
                height: "200px", // 고정된 높이
                objectFit: "cover", // 이미지 비율 유지하며 잘리지 않도록 설정
                borderRadius: "8px", // 이미지 모서리를 둥글게
              }}
            />
            <h3>{item.title || "제목 없음"}</h3>
            <h4>
              {item.hall || "공연장 정보 없음"} / {item.area || "지역 정보 없음"}
            </h4>
            <p>{item.date || "날짜 정보 없음"}</p>
          </div>
        ))
      ) : (
        <p>데이터를 불러오는 중...</p>
      )}
    </section>
  );
};

export default ExhibitionGrid;