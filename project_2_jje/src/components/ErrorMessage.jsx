// 📂 src/components/Loading.js
import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div className="text-center mt-5">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
