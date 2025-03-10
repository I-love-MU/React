from django.urls import path
from .views import fetch_kopis_data

urlpatterns = [
    path("kopis-data/", fetch_kopis_data, name="fetch_kopis_data"),  # ✅ API 엔드포인트 추가
]
