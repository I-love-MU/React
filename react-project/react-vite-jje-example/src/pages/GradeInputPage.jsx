import { useState } from 'react';

const GradeInputPage = () => {
  // 상태값 (국어, 영어, 수학 점수 및 이름)
  const [kor, setKor] = useState(0);
  const [eng, setEng] = useState(0);
  const [math, setMath] = useState(0);
  const [name, setName] = useState('');

  // 입력 핸들러 함수
  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onKorChange = (event) => {
    setKor(Number(event.target.value)); // 숫자로 변환
  };

  const onEngChange = (event) => {
    setEng(Number(event.target.value)); // 숫자로 변환
  };

  const onMathChange = (event) => {
    setMath(Number(event.target.value)); // 숫자로 변환
  };

  // 점수 계산
  const total = kor + eng + math;
  const average = (total / 3).toFixed(2); // 평균 소수점 2자리

  // 입력 초기화 함수
  const resetInputs = () => {
    setKor(0);
    setEng(0);
    setMath(0);
    setName('');
  };

  return (
    <div>
      <h2>성적 입력 페이지</h2>
      <div>
        이름: <input name="name" onChange={onNameChange} value={name} /><br /><br />
        국어: <input type="number" name="kor" onChange={onKorChange} value={kor} /><br /><br />
        영어: <input type="number" name="eng" onChange={onEngChange} value={eng} /><br /><br />
        수학: <input type="number" name="math" onChange={onMathChange} value={math} /><br /><br />
      </div>
      <div>
        <h3>결과</h3>
        <p>이름: {name}</p>
        <p>총점: {total}</p>
        <p>평균: {average}</p>
      </div>
      <button onClick={resetInputs}>초기화</button>
    </div>
  );
};

export default GradeInputPage;
