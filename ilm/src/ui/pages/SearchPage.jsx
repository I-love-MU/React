import { useRef, useState } from 'react'
import SearchbyLocation from '../components/SearchbyLocation'

// 진짜 searchpage 에 컴포넌트로 삽입될 위치 기반 탐색 기능
function SearchPage() {
  const apiFilter = useRef({
    serviceKey: import.meta.env.VITE_OPENAPI_API_KEY,
    pageNum: '1',
    numOfRow: '10',
    from: '',
    to: '',
    keyword: '',
    sortStdr: '', // (1:등록일, 2:공연명, 3:지역)
    realmCode: '', // (A000: 연극, B000: 음악/콘서트, B002: 국악, C000: 무용/발레, D000: 전시, B003: 뮤지컬/오페라, E000: 아동/가족, F000: 행사/축제, G000: 교육/체험, H000: 도서, I000: 체육, L000: 기타)
    serviceTp: '', // (A:공연/전시, B:행사/축제, C:교육/체험)
  })

  const [searchResult, setSearchResult] = useState(null)

  return (
    <>
      <SearchbyLocation apiFilter={apiFilter.current} setSearchResult={setSearchResult} />

      {/* 🔹 검색 결과 출력 */}
      {searchResult && (
        <div className='mt-4'>
          <h3>검색 결과:</h3>
          <pre>{JSON.stringify(searchResult, null, 2)}</pre>
        </div>
      )}
    </>
  )
}

export default SearchPage
