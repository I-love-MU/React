import React, { useEffect, useState } from "react";
import { fetchKopisData } from "../api/kopisApi";
import Loading from "./Loading";
import "../styles/ContentList.css";

const ContentList = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getContents = async () => {
      const data = await fetchKopisData();
      setContents(data);
      setLoading(false);
    };
    getContents();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="content-list">
      {contents.map((content) => (
        <div key={content.mt20id} className="content-card">
          <img src={content.poster} alt={content.prfnm} />
          <h3>{content.prfnm}</h3>
          <p>{content.fcltynm}</p>
        </div>
      ))}
    </div>
  );
};

export default ContentList;
