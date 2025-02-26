import React, { useRef, useState, useEffect } from 'react';
// 첫번째 사용하는 경우:
  // useRef는 변화는 감지해야 되지만, 렌더링은 하고 싶지 않을때 사용. (잘 안씀)
// 중요한 사실 :
  // 화면 갱신이 일어난다 = 해당 컴포넌트를 실행한다.

const UseRef1Page = () => {
  const [count, setCount] = useState(0);
  const [refValue, setRefValue] = useState(1); // Ref 값을 반영하기 위한 상태 추가
  const countRef = useRef(1);

  console.log(countRef);
  console.log('호출되고 있음');

  const increaseCountState = () => {
    setCount(count + 1);
  };

  const increaseCountRef = () => {
    countRef.current = countRef.current + 1;
    setRefValue(countRef.current); // Ref 값을 useState로 관리하여 업데이트
  };

  return (
    <div className='text-center mt-5'>
        <p>State : {count}</p>
        <p>Ref : {refValue}</p> {/* 상태 기반으로 렌더링 */}
        <button onClick={increaseCountState}>State 값 올려</button>
        <button onClick={increaseCountRef}>Ref 값 올려</button>      
    </div>
  );
};

export default UseRef1Page;
