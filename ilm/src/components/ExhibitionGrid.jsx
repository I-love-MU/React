import React, { useEffect, useState } from "react";
import { fetchExhibitionData } from "./Fetchdata"; // API 함수 import

const ExhibitionGrid = () => {
  const [exhibitionItems, setExhibitionItems] = useState([]); // 초기 상태는 빈 배열

  useEffect(() => {
    const fetchData = async () => {
      // const data = await fetchExhibitionData(); // API 데이터 가져오기
      // 공연정보 3가지 가져오기 
      const theatre = await fetchExhibitionData("AAAA");
      
      const concert = await fetchExhibitionData("BBBC");
    
      const exhibition = await fetchExhibitionData("CCCC");
    
      //3가지 봉합 
      setExhibitionItems([...theatre, ...concert, ...exhibition]);

      // console.log("tata", data)
      // setExhibitionItems(data); // 상태 업데이트
    };

    fetchData();
  }, []); // ✅ 의존성 배열을 빈 값([])으로 두어 최초 1회만 실행

  return (
    <section style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", padding: "20px" }}>
      {exhibitionItems.length > 0 ? ( // 데이터가 있을 때만 렌더링
        exhibitionItems.map((item, index) => (
          
          <div key={index} style={{ textAlign: "center" }}>
            <img src={item.poster} alt={item.title} style={{ width: "100%", height: "auto" }} />
            <h3>{item.title}</h3>
            <p>{item.date}</p>
          </div>
        ))
      ) : (
        <p>데이터를 불러오는 중...</p> // 데이터 로딩 중 표시
      )}
    </section>
  );
};

export default ExhibitionGrid;
