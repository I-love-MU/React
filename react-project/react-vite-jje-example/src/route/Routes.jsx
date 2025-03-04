import BoardPage from '../pages/BoardPage'
import HelloPage from '../pages/HelloPage'
import HomePage from '../pages/HomePage'
import ProfilePage from '../pages/ProfilePage'
import JSXPage from '../pages/JSXPage'
import ConditionalPage from '../pages/ConditionalPage'
import BootStrapPage from '../pages/BootStrapPage'
import PropsPage from '../pages/PropsPage'
import CounterPage from '../pages/CounterPage'
import UseEffectPage from '../pages/UseEffectPage'
import UseRef1Page from '../pages/UseRef1Page'
import UseRef2Page from '../pages/UseRef2Page'
import AxiosGetPage from '../pages/AxiosGetPage'
import AxiosPostPage from '../pages/AxiosPostPage' // ✅ 올바르게 변경
import AxiosClient from '../pages/AxiosClient'
import InputPage from '../pages/InputPage'
import GradeInputPage from '../pages/GradeInputPage'
import GradeInputPage2 from '../pages/GradeInputPage2'
import InlineStylePage from '../pages/cssPage/InlineStylePage'
import StyledComponentPage from '../pages/cssPage/StyledComponentPage'
import CounterContextPage from '../pages/CounterContextPage'
import { CounterProvider } from '../contexts/CounterContext'

const routes = [
  {
    path: '/',
    element: <HomePage />,
    title: 'Home',
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    title: 'Profile',
  },
  {
    path: '/board',
    element: <BoardPage />,
    title: 'Board',
  },
  {
    path: '/hello',
    element: <HelloPage />,
    title: 'Hello',
  },
  {
    path: '/jsx',
    element: <JSXPage />,
    title: 'jsx문법',
  },
  {
    path: '/conditional',
    element: <ConditionalPage />,
    title: '조건부랜더링',
  },
  {
    path: '/bootstrap',
    element: <BootStrapPage />,
    title: '부트스트랩적용',
  },
  {
    path: '/props',
    element: <PropsPage />,
    title: '프롭스',
  },
  {
    path: '/usestate',
    element: <CounterPage />,
    title: 'useState-연습',
  },
  {
    path: '/useeffect',
    element: <UseEffectPage />,
    title: 'useEffect-연습',
  },
  {
    path: '/useRef1',
    element: <UseRef1Page />,
    title: 'useRef-1',
  },
  {
    path: '/useRef2',
    element: <UseRef2Page />,
    title: 'useRef-2',
  },
  {
    path: '/axiosget',
    element: <AxiosGetPage />,
    title: 'axios-get',
  },
  {
    path: '/axiosclient',
    element: <AxiosClient />,
    title: 'axios-client',
  },
  {
    path: '/input',
    element: <InputPage />,
    title: '기본-input',
  },
  {
    path: '/grade',
    element: <GradeInputPage />,
    title: 'grade-input',
  },
  {
    path: '/grade2',
    element: <GradeInputPage2 />,
    title: 'grade-input(다중입력)',
  },
  {
    path: '/styled-css',
    element: <InlineStylePage />,
    title: 'inline-style',
  },
  {
    path: '/styled-component',
    element: <StyledComponentPage />,
    title: 'styled-component',
  },
  {
    path: '/context-apply',
    element: (
      <CounterProvider>
        <div>머리말</div>
        <CounterContextPage />
        <div>꼬리말</div>
      </CounterProvider>
    ),
    title: 'contextAPI-활용-counter',
  },
];

export default routes
