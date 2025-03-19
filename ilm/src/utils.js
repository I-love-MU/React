// src/utils.js
export const formatDate = (dateString) => {
  // 값이 없거나, 8자리 문자열이 아닐 경우 '날짜 정보 없음' 반환
  if (!dateString || typeof dateString !== 'string' || dateString.length !== 8) {
    return '날짜 정보 없음'
  }

  return `${dateString.slice(0, 4)}.${dateString.slice(4, 6)}.${dateString.slice(6, 8)}`
}
