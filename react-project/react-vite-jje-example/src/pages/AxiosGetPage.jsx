import axios from 'axios';
import React, { useEffect, useState } from 'react';
import userService from './services/UserService';

const AxiosPostPage = () => {
  const [data, setData] = useState(null);

  useEffect(()=>{
    userService.getUsers().then((data)=>{
      setData(data)
    })
  },[])

  const getUsers = () => {
    axios
      .post('https://jsonplaceholder.typicode.com/posts', {
        userId: 12345,
        id: 101,
        body: '테스트 홍길동',
        title: 'test title 홍길동'
      })
      .then((response) => {
        // 통신이 성공했을 때
        console.log('✅ POST 성공:', response.data);
        setData(response.data);
      })
      .catch((error) => {
        // 에러 발생 시
        console.error('❌ 에러 발생:', error);
      })
      .finally(() => {
        // 무조건 실행되는 코드
        console.log('에러 여부 상관없이 실행됩니다.');
      });
  };

  return (
    <div className="text-center mt-5">
      <h2>Axios POST 연습</h2>
      <button onClick={getUsers}>POST 요청 보내기</button>
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
