import requests
from django.http import JsonResponse

def fetch_kopis_data(request):
    API_URL = "http://www.kopis.or.kr/openApi/restful/pblprfr"
    SERVICE_KEY = "5f85f47bc026474d8d1b162a7b7c5f12"  # 🔹 여기에 올바른 API 키를 입력해야 함

    params = {
        "service": SERVICE_KEY,
        "stdate": "20240301",
        "eddate": "20240331",
        "cpage": 1,
        "rows": 5,
        "prfstate": "02",
    }

    response = requests.get(API_URL, params=params)

    # ✅ API 응답 상태 코드 및 본문 확인
    print(f"Response Status Code: {response.status_code}")
    print(f"Response Text: {response.text}")

    return JsonResponse({"response_text": response.text}, safe=False)
