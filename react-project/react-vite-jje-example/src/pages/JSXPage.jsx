import React from 'react'

// 문법
// 1. 반드시 부모 태그가 있어야 함
//  - Virtual DOM에서 컴포넌트 변화를 감지할 때 효율적으로
//  비교할 수 있도록 컴포넌트 내부는 하나의 DOM트리 구조로 이루어져야 한다.
// 2. 변수 사용시 {}, 표현식 문법, 식이 갑으로 평가될 수 있는 묹법
// 3. 조건문(if) 사용시 > 삼항연산자 사용
// 4. class 대신 className
// 5. React DOM은 HTML 어트리뷰트 이름 대시 camelCase 프로퍼티

const JSXPage = () => {
  const name = '리액트'
  const color = 'red'
  const isLogin = true

  const style = {
    backgroundColor: 'green',
    fontSize: '32px',
  }

//   return (
//     <>
//     {
//       isLogin ? (
//         <div>로그인 되었습니다.</div>
//         ) : (
//           <div>로그인 필요합니다.</div>
//         )
//     }
//     </>
//   )
// }
  return (
    <>
      <div className='d-flex' style={style}>안녕하세요</div>
    </>
  )
}
export default JSXPage
