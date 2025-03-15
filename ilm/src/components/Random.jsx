import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = `/api/pblprfr?service=080368b7702b47339979702578fcbd3e&stdate=20240101&eddate=20240131&rows=10&cpage=1&shcate=AAAA`;

// ✅ XML을 JSON으로 변환하는 함수 (DOMParser 사용)
const parseXML = (xmlString) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlString, "application/xml");
  const dbs = xml.getElementsByTagName("db");

  let data = [];
  for (let db of dbs) {
    data.push({
      title: db.getElementsByTagName("prfnm")[0]?.textContent || "제목 없음",
      id: db.getElementsByTagName("mt20id")[0]?.textContent || "N/A",
    });
  }
  return data;
};

// ✅ API 데이터를 가져오는 함수
const Random = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
        method:'get',
        url: API_URL,
        withCredentials: true
    })
      .then((response) => {
        console.log(response.data)
        const jsonData = parseXML(response.data);
        console.log(jsonData)
        setData(jsonData);
      })
      .catch((error) => console.error("API 요청 오류:", error));
  }, []);

  return (
    <div>
      <h1>공연 목록</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            공연명: {item.title} | 공연 ID: {item.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Random;
