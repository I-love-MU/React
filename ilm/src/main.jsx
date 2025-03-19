import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './route/Router' // `export default`로 가져옴

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter /> {/* 라우터 추가 */}
  </React.StrictMode>,
)
