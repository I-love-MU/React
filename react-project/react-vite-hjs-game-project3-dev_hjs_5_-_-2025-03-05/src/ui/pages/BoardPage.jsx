import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BoardPage = () => {
  const [contacts, setContacts] = useState([]);

  const getContacts = (pageNum, pageSize) => {
    axios
      .get(`https://sample.bmaster.kro.kr/contacts?pageno=${pageNum}&pagesize=${pageSize}`)
      .then((response) => {
        console.log(response);
        setContacts(response.data.contacts);
      })
      .catch((error) => console.log(error));
  };

  // 렌더링 할 때 한 번만 실행
  useEffect(() => {
    getContacts(3, 10);
  }, []);

  // 삭제 함수 추가
  const deleteBoard = (contactNo) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.no !== contactNo));
  };

  // const deleteBoard = (event) => {
  //   const no = event.target.value
  //   setContacts(contacts.filter((contact) => (contact.no != no)) )
  // }

  return (
    <div className='container mt-3'>
      <div className='container-fluid'>
        <h1 className='h1 mb-2 text-gray-800 text-center'>게시판</h1>

        {/* DataTables Example */}
        <div className='card shadow mb-4'>
          <div className='card-header py-3'>
            <h6 className='m-0 font-weight-bold text-primary'>DataTables Example</h6>
          </div>
          <div className='card-body'>
            <div className='table-responsive'>
              <table className='table table-bordered text-center align-middle' width='100%' cellSpacing='0'>
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>이름</th>
                    <th>전화번호</th>
                    <th>주소</th>
                    <th>사진</th>
                    <th className='text-center'>삭제</th>
                  </tr>
                </thead>

                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.no}>
                      <td>{contact.no}</td>
                      <td>{contact.name}</td>
                      <td>{contact.tel}</td>
                      <td>{contact.address}</td>
                      <td>
                        <img src={contact.photo} alt='' />
                      </td>
                      <td className='text-center'>
                        <button className='btn btn-success' onClick={() => deleteBoard(contact.no)}>
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
