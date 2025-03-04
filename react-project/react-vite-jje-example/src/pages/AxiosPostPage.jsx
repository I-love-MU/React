import axios from 'axios';
import React, { useState } from 'react';

const AxiosPostPage = () => {
  const [data, setData] = useState(null);

  const postData = () => {
    axios
      .post('https://jsonplaceholder.typicode.com/posts', {
        userId: 12345,
        id: 101,
        title: '테스트 홍길동',
        body: 'POST 요청을 테스트합니다.'
      })
      .then((response) => {
        console.log('✅ POST 성공:', response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error('❌ 에러 발생:', error);
      })
      .finally(() => {
        console.log('요청 완료 (에러 여부와 상관없이 실행)');
      });
  };

  return (
    <div className="text-center mt-5">
      <h2>Axios POST 요청 테스트</h2>
      <button onClick={postData}>POST 요청 보내기</button>
      <hr />
      {data && (
        <div>
          <h3>타이틀: {data.title}</h3>
          <h3>유저아이디: {data.userId} , 아이디: {data.id}</h3>
          <h3>바디: {data.body}</h3>
        </div>
      )}
    </div>
  );
};

export default AxiosPostPage;
