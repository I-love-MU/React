import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AxiosClient = () => {
  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('https://sample.bmaster.kro.kr/contacts?pageno=3&pagesize=10');
        console.log('✅ 데이터 가져오기 성공:', response.data.contacts);
        setContacts(response.data.contacts);
      } catch (error) {
        console.error('❌ 데이터 가져오기 실패:', error);
      } finally {
        console.log('에러 여부와 관계없이 실행됩니다.');
      }
    };

    fetchContacts();
  }, []);

  const removeClick = (event) => {
    let no = event.target.name;
    console.log('삭제 요청:', no);

    setContacts((prevContacts) => prevContacts.filter((contact) => contact.no !== parseInt(no)));
  };

  return (
    <div>
      <h2>클라이언트 테이블 받아오기 연습</h2>
      <button onClick={() => getClick()}>클라이언트 데이터</button>
      <hr />
      <div className='d-flex justify-content-center'>
        <table border="1">
          <thead>
            <tr>
              <th>번호</th>
              <th>이름</th>
              <th>전화번호</th>
              <th>주소</th>
              <th>사진</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {contacts &&
              contacts.map((contact, index) => (
                <tr key={index}>
                  <td>{contact.no}</td>
                  <td>{contact.name}</td>
                  <td>{contact.tel}</td>
                  <td>{contact.address}</td>
                  <td>
                    <img src={contact.photo} alt="contact" width="50" height="50" />
                  </td>
                  <td>
                    <input type='button' name={contact.no} value='삭제' onClick={removeClick} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AxiosClient;
