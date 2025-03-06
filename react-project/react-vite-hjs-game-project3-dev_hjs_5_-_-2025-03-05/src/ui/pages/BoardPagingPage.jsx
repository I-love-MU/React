import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Pagination from 'react-js-pagination';

const BoardPagingPage = () => {
  // 초기 상태 정의
  const initPaging = {
    activePage: 1,  // 현재 페이지
    limit: 10,  // 한 페이지당 아이템 개수
    pageCount: 10,  // 페이지 범위
    totalCount: 0,  // 전체 게시물 개수
    data: [],  // 게시물 데이터
  };

  const [paging, setPaging] = useState(initPaging);

  // 연락처 데이터를 가져오는 함수
  const getContacts = (pageNum = 1) => {
    axios
      .get(`https://sample.bmaster.kro.kr/contacts?pageno=${pageNum}&pagesize=${paging.limit}`)  // ✅ pageSize → paging.limit
      .then((response) => {
        setPaging((prev) => ({
          ...prev,
          data: response.data.contacts,
          totalCount: response.data.totalcount,
          activePage: pageNum,  // ✅ 현재 페이지 업데이트
        }));
      })
      .catch((error) => console.error(error));
  };

  // 페이지가 처음 렌더링될 때 데이터 불러오기
  useEffect(() => {
    getContacts(1);
  }, []);

  // 삭제 함수
  const deleteBoard = (contactNo) => {
    setPaging((prev) => ({
      ...prev,
      data: prev.data.filter((contact) => contact.no !== contactNo),
    }));
  };

  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    getContacts(pageNumber);
  };

  return (
    <div className='container mt-3'>
      <div className='container-fluid'>
        <h1 className='h1 mb-2 text-gray-800 text-center'>게시판</h1>

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
                  {paging.data.map((contact) => (
                    <tr key={contact.no}>
                      <td>{contact.no}</td>
                      <td>{contact.name}</td>
                      <td>{contact.tel}</td>
                      <td>{contact.address}</td>
                      <td>
                        <img src={contact.photo} alt='프로필 사진' width='50' height='50' />
                      </td>
                      <td className='text-center'>
                        <button className='btn btn-danger' onClick={() => deleteBoard(contact.no)}>
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 페이징 */}
            <PaginationBox>
              <Pagination
                activePage={paging.activePage}
                itemsCountPerPage={paging.limit}
                totalItemsCount={paging.totalCount}
                pageRangeDisplayed={paging.pageCount}
                onChange={handlePageChange}
                prevPageText={""}  // 🔥 이전 화살표 제거
                nextPageText={""}  // 🔥 다음 화살표 제거
              />
            </PaginationBox>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child,
  ul.pagination li:last-child {
    display: none !important;  /* 🔥 화살표 버튼 숨기기 */
  }
  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: transparent !important;  /* 🔥 페이지 선택 시 하이라이트 제거 */
    color: inherit !important;
  }
  ul.pagination li a:hover {
    color: blue;
  }
`;

export default BoardPagingPage;
