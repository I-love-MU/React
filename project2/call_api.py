import requests

# API 엔드포인트 (지역별 공연 목록 조회)
url = "https://www.culture.go.kr/openapi/rest/publicperformancedisplays/area"

# 요청 파라미터
params = {
    "serviceKey": "YOUR_API_KEY",  # 본인 API Key 입력
    "rows": 10,       # 가져올 데이터 개수
    "cPage": 1,       # 페이지 번호
    "place": "서울",   # 지역 설정
    "sortStdr": 1     # 최신순 정렬
}

# API 요청 (GET 방식)
response = requests.get(url, params=params)

# 응답 데이터 확인
if response.status_code == 200:
    print(response.text)  # XML or JSON 데이터 출력
else:
    print("API 요청 실패:", response.status_code)
