import dayjs from 'dayjs'

export   const formatDate = (date) => {
  if (!date) return '데이터 없음'
  return dayjs(date.toString()).format('YYYY.MM.DD')
}



export const decodetext = (text) => {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}
